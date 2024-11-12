'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import { useRouter } from 'next/navigation'

export default function EncodePage() {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !message) return

    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('message', message)

      const response = await fetch('/api/encode', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Encoding failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Create download link
      const a = document.createElement('a')
      a.href = url
      a.download = 'encoded-image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // Cleanup
      window.URL.revokeObjectURL(url)
      
      alert('Message hidden successfully!')
      router.push('/')
    } catch (error) {
      alert('Failed to hide message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Hide a Message</h1>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Your Secret Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-white"
              rows={4}
              required
            />
          </label>

          <ImageUpload onImageSelect={(f) => setFile(f)} />
        </div>

        <button
          type="submit"
          disabled={loading || !file || !message}
          className={`w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : 'Hide Message'}
        </button>
      </form>
    </main>
  )
}