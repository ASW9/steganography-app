import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-bold mb-8">Image Steganography</h1>
        <p className="text-gray-300 mb-12 max-w-md mx-auto">
          Hide secret messages in images using LSB steganography, or decode hidden messages from images.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/encode" 
            className="block w-64 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Hide a Message
          </Link>
          
          <Link 
            href="/decode" 
            className="block w-64 py-3 px-6 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
          >
            Reveal a Message
          </Link>
        </div>
      </div>
    </main>
  )
}