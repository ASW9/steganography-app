import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  acceptedTypes?: string
}

export default function ImageUpload({ onImageSelect, acceptedTypes = "image/jpeg,image/png,image/heic" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cleanup function for blob URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|heic)$/i)) {
      alert('Please upload a JPG, PNG, or HEIC image.')
      return
    }

    // Create blob URL instead of data URL
    const blobUrl = URL.createObjectURL(file)
    setPreview(blobUrl)
    onImageSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={acceptedTypes}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />

        {preview ? (
          <div className="relative w-full aspect-video">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized // Add this to bypass Next.js image optimization for local previews
            />
          </div>
        ) : (
          <div className="text-gray-500">
            <p>Drag and drop an image here, or click to select</p>
            <p className="text-sm mt-2">Supports JPG, PNG, and HEIC</p>
          </div>
        )}
      </div>
    </div>
  )
}