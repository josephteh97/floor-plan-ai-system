import React, { useCallback, useState } from 'react'
import { Upload as UploadIcon, FileText, Loader2 } from 'lucide-react'

export default function Upload({ onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }, [onUpload])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }, [onUpload])

  return (
    <div className="w-full">
      <div 
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 transition-colors
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-100"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/*"
            disabled={loading}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {loading ? (
                <>
                    <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin" />
                    <p className="mb-2 text-lg text-gray-500 font-medium">Analyzing Floor Plan...</p>
                    <p className="text-sm text-gray-400">Running Computer Vision & 3D Generation</p>
                </>
            ) : (
                <>
                    <UploadIcon className="w-12 h-12 mb-4 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </>
            )}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Supported AI Models: Qwen3-VL, YOLOv8, PaddleOCR</p>
      </div>
    </div>
  )
}
