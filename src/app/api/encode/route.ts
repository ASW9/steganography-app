import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { encode } from '@/lib/steganography'
import convert from 'heic-convert'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as Blob
    const message = formData.get('message') as string

    if (!image || !message) {
      return NextResponse.json(
        { error: 'Missing image or message' },
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

    // Encode message
    const encodedData = encode(data, message, info.width, info.height)

    // Convert back to PNG
    const outputBuffer = await sharp(encodedData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toBuffer()

    // Return the encoded image
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="encoded-image.png"',
      },
    })
  } catch (error) {
    console.error('Encoding error:', error)
    return NextResponse.json(
      { error: 'Failed to encode message' },
      { status: 500 }
    )
  }
}