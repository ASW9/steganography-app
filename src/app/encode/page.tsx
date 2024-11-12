'use client'
import ImageUpload from '@/components/ImageUpload'
import { useState } from 'react'

export default function EncodePage() {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !message) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)
      formData.append('message', message)

      const response = await fetch('/api/encode', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to encode message')
      }

      // Get the encoded image as a blob
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `encoded-${file.name}` // Keep original file extension
      document.body.appendChild(a)
      a.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      // Reset form
      setMessage('')
      setFile(null)
      alert('Message hidden successfully! Image downloaded.')

    } catch (error) {
      console.error('Error:', error)
      alert('Failed to hide message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
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

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">Hide a Message</h1>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Your Secret Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-800/50 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500 glass"
              rows={4}
              required
            />
          </label>

          <ImageUpload 
            onImageSelect={(f) => setFile(f)} 
            currentFile={file}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !file || !message}
          className="w-full py-4 px-6 button-sink bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white font-semibold text-lg glass disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Hide Message'
          )}
        </button>
      </form>
    </div>
  )
}