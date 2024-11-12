import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { decode } from '@/lib/steganography'
import convert from 'heic-convert'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as Blob

    if (!image) {
      return NextResponse.json(
        { error: 'Missing image' },
        { status: 400 }
      )
    }

    // Convert image to buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer())

    // Handle HEIC images
    let processedBuffer = imageBuffer
    if (image.type === 'image/heic') {
      processedBuffer = await convert({
        buffer: imageBuffer,
        format: 'PNG'
      })
    }

    // Convert to RGB format
    const { data, info } = await sharp(processedBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Decode message
    const message = decode(data, info.width, info.height)

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Decoding error:', error)
    return NextResponse.json(
      { error: 'Failed to decode message' },
      { status: 500 }
    )
  }
}