'use client'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function Home() {
  const router = useRouter()
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  const secondButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="min-h-[calc(100vh-76px)] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 fade-in">
          Image Steganography
        </h1>
        
        <p className="text-lg text-gray-200 mb-12 fade-in">
          Hide your secrets in plain sight. Securely embed messages within images using advanced LSB steganography.
        </p>

        <div className="bg-purple-900/30 p-6 rounded-lg glass mb-8 fade-in">
          <h2 className="text-xl font-semibold text-white mb-2">🔥 Free Cybersecurity Course</h2>
          <p className="text-gray-300 mb-4">
            Learn the fundamentals of cybersecurity, including steganography, encryption, and more. Join our upcoming free course and start your journey into cybersecurity.
          </p>
          <a 
            href="https://g1ozago1ehq.typeform.com/to/d80QWhZv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Click the link on the top to sign up now! (only spaces remaining)
          </a>
        </div>
        
        <div className="relative space-y-6 w-full max-w-md mx-auto">
          <button 
            ref={firstButtonRef}
            onClick={() => router.push('/encode')}
            className="throw-in-first neon-glow button-sink w-full py-4 px-6 border-2 border-purple-500 hover:border-purple-400 rounded-lg transition-all duration-300 text-white font-semibold text-lg glass hover:shadow-lg hover:shadow-purple-500/20 active:translate-y-1 active:shadow-none"
          >
            Hide a Message
          </button>
          
          <button 
            ref={secondButtonRef}
            onClick={() => router.push('/decode')}
            className="throw-in-second neon-glow button-sink w-full py-4 px-6 border-2 border-purple-500 hover:border-purple-400 rounded-lg transition-all duration-300 text-white font-semibold text-lg glass hover:shadow-lg hover:shadow-purple-500/20 active:translate-y-1 active:shadow-none"
          >
            Reveal a Message
          </button>
        </div>
      </div>
    </div>
  )
}