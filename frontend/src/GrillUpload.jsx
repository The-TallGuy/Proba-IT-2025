import { useState } from 'react'
import './Login.css'
import axiosInstance from './utils/axiosConfig'

function GrillUpload({ onBack, onSuccess }) {
  const [name, setName] = useState('')
  const [menu, setMenu] = useState('Meat Lovers')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        setPhoto(null)
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        setPhoto(null)
        return
      }
      setPhoto(file)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!photo) {
      setError('Please select a photo of your grill')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('grill', photo)
      formData.append('name', name)
      formData.append('menu', menu)
      formData.append('description', description)

      const response = await axiosInstance.post('/grills/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Grill uploaded successfully!')
      onSuccess()
    } catch (err) {
      console.error('Upload error:', err)
      if (err.response) {
        setError(err.response.data || 'Upload failed. Please try again.')
      } else if (err.request) {
        setError('Unable to connect to server. Please try again later.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Upload Your Grill</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Grill Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                maxLength="50"
                placeholder="Give your grill a name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Menu Type</label>
              <select 
                className="form-select" 
                value={menu} 
                onChange={e => setMenu(e.target.value)}
                required
              >
                <option value="Meat Lovers">Meat Lovers</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                rows="3"
                maxLength="500"
                placeholder="Describe your grill (optional)"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Grill Photo</label>
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <button type="button" className="btn btn-link p-0" onClick={onBack}>
                Cancel
              </button>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Grill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GrillUpload
