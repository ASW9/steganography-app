'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  currentFile: File | null
  acceptedTypes?: string
}

export default function ImageUpload({ 
  onImageSelect, 
  currentFile, 
  acceptedTypes = "image/jpeg,image/png,image/heic" 
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cleanup function for the preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  // Reset preview when currentFile is null
  useEffect(() => {
    if (!currentFile) {
      setPreview(null)
    }
  }, [currentFile])

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|heic)$/i)) {
      alert('Please upload a JPG, PNG, or HEIC image.')
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 5MB.')
      return
    }

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Pass file to parent component
      onImageSelect(file)
    } catch (error) {
      console.error('Error handling file:', error)
      alert('Error processing image. Please try again.')
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${dragActive 
            ? 'border-purple-500 bg-purple-500/10' 
            : 'border-gray-600 hover:border-purple-500/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
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
              className="object-contain rounded"
              unoptimized
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPreview(null)
                onImageSelect(null as any)
              }}
              className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-gray-300">
            <svg
              className="mx-auto h-12 w-12 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2">Drag and drop an image here, or click to select</p>
            <p className="text-sm text-gray-400">
              Supports JPG, PNG, and HEIC (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}