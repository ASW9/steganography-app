'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

export default function DecodePage() {
  const [decodedMessage, setDecodedMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageSelect = async (file: File) => {
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/decode', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Decoding failed')

      const { message } = await response.json()
      setDecodedMessage(message)
    } catch (error) {
      alert('Failed to decode message. Please try again.')
      setDecodedMessage('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Reveal Hidden Message</h1>
        
        <ImageUpload onImageSelect={handleImageSelect} />

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
    </main>
  )
}