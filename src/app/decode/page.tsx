'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

export default function DecodePage() {
  const [decodedMessage, setDecodedMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageSelect = async (file: File) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/decode', {
      method: 'POST',
      body: formData,
    })

    const { message } = await response.json()
    setDecodedMessage(message)
  }
  

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Reveal Hidden Message</h1>
        
        <ImageUpload onImageSelect={handleImageSelect} currentFile={null} />

        {loading && (
          <div className="text-center text-gray-300">
            Decoding message...
          </div>
        )}

        {decodedMessage && (
          <div className="p-4 bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Hidden Message:</h2>
            <p className="text-gray-300">{decodedMessage}</p>
          </div>
        )}
      </div>
      <div className="min-h-[calc(100vh-76px)] flex flex-col items-center justify-center px-4">
        {/* Course Promo */}
        <div className="text-center mb-8">
          <div className="bg-purple-900/30 p-4 rounded-lg glass inline-block max-w-md">
            <p className="text-gray-300 text-sm mb-2">
              Want to learn more about steganography and cybersecurity?
            </p>
            <a 
              href="https://g1ozago1ehq.typeform.com/to/d80QWhZv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 text-sm font-medium"
            >
              Join our free course → 
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}