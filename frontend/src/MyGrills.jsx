import { useState, useEffect } from 'react'
import './MainMenu.css'
import axiosInstance from './utils/axiosConfig'

function MyGrills({ onBack, onUpload }) {
  const [grills, setGrills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchGrills()
  }, [])

  const fetchGrills = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/grills/my-grills')
      setGrills(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching grills:', err)
      setError('Failed to load your grills. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (grillId, grillName) => {
    if (!confirm(`Are you sure you want to delete "${grillName}"?`)) {
      return
    }

    try {
      await axiosInstance.delete(`/grills/${grillId}`)
      setGrills(grills.filter(g => g._id !== grillId))
      alert('Grill deleted successfully!')
    } catch (err) {
      console.error('Error deleting grill:', err)
      alert('Failed to delete grill. Please try again.')
    }
  }

  const handleLike = async (grillId) => {
    try {
      const response = await axiosInstance.post(`/grills/${grillId}/like`)
      setGrills(prevGrills => 
        prevGrills.map(grill => 
          grill._id === grillId 
            ? { ...grill, mici: response.data.mici, isLiked: response.data.isLiked }
            : grill
        )
      )
    } catch (err) {
      console.error('Error liking grill:', err)
      alert('Failed to like grill. Please try again.')
    }
  }

  return (
    <div className="mainmenu-root">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Grills</h2>
          <div>
            <button className="btn btn-primary me-2" onClick={onUpload}>
              Upload New Grill
            </button>
            <button className="btn btn-outline-secondary" onClick={onBack}>
              Back
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : grills.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No grills found.</p>
          </div>
        ) : (
          <div className="row g-4">
            {grills.map(grill => (
              <div key={grill._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img 
                    src={`http://localhost:3000/${grill.photoUrl}`} 
                    className="card-img-top" 
                    alt={grill.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{grill.name}</h5>
                    <p className="card-text">
                      <span className="badge bg-secondary me-2">{grill.menu}</span>
                      <span className="text-muted">
                        <img src="/Mici_Rumeniti.png" alt="mici" style={{width: '18px', height: '18px', marginRight: '4px'}} />
                        {grill.mici} mici
                      </span>
                    </p>
                    {grill.description && (
                      <p className="card-text small text-muted">{grill.description}</p>
                    )}
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <div className="d-grid gap-2">
                      <button 
                        className={`btn btn-sm ${grill.isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => handleLike(grill._id)}
                      >
                        <img 
                          src={grill.isLiked ? '/Mici_Rumeniti.png' : '/Mici_Cruzi.png'} 
                          alt="mic" 
                          style={{width: '18px', height: '18px', marginRight: '4px'}} 
                        />
                        {grill.isLiked ? 'Take Back Mic' : 'Give a Mic!'}
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(grill._id, grill.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyGrills
