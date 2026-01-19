import { useState } from 'react'
import Upload from './components/Upload'
import Viewer3D from './components/Viewer3D'
import axios from 'axios'

function App() {
  const [analysis, setAnalysis] = useState(null)
  const [model3d, setModel3d] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async (file) => {
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setAnalysis(response.data.analysis)
      setModel3d(response.data.model_3d)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Floor Plan AI System</h1>
        {model3d && (
            <button 
                onClick={() => setModel3d(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                New Analysis
            </button>
        )}
      </header>
      
      {!model3d && (
        <div className="max-w-xl mx-auto mt-12">
            <Upload onUpload={handleUpload} loading={loading} />
            {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
        </div>
      )}

      {model3d && (
        <div className="flex flex-col gap-6">
            <div className="h-[600px] w-full bg-slate-900 rounded-lg shadow-xl overflow-hidden relative">
                <Viewer3D data={model3d} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium text-gray-500 mb-2">Elements Detected</h3>
                        <ul className="list-disc pl-5">
                            <li>Walls: {model3d.walls.length}</li>
                            <li>Doors: {model3d.doors.length}</li>
                            <li>Windows: {model3d.windows.length}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-500 mb-2">Rooms Identified</h3>
                        <div className="flex flex-wrap gap-2">
                            {model3d.rooms.map((room, i) => (
                                <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    {room.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default App
