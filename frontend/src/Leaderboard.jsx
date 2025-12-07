import { useState, useEffect } from 'react'
import './MainMenu.css'
import axiosInstance from './utils/axiosConfig'
import { useAuth } from './context/AuthContext'

function Leaderboard({ onBack }) {
  const [grills, setGrills] = useState([])
  const [sortBy, setSortBy] = useState('mici')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/grills/leaderboard')
      setGrills(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      setError('Failed to load leaderboard. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSortedGrills = () => {
    let sorted = [...grills]
    
    switch (sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a._id) - new Date(b._id))
        break
      case 'date-desc':
        sorted.sort((a, b) => new Date(b._id) - new Date(a._id))
        break
      case 'mici':
      default:
        sorted.sort((a, b) => b.mici - a.mici)
        break
    }
    
    return sorted
  }

  const sortedGrills = getSortedGrills()
  const topThree = sortedGrills.slice(0, 3)
  const restOfGrills = sortedGrills.slice(3)

  const getMedalEmoji = (index) => {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return ''
    }
  }

  const handleLike = async (grillId) => {
    if (!isAuthenticated) {
      alert('Please log in to like grills!')
      return
    }

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
          <h2 className="mb-0">Grills for Pimps</h2>
          <button className="btn btn-outline-secondary" onClick={onBack}>
            Back
          </button>
        </div>

        <div className="mb-4">
          <label className="form-label me-2">Sort by:</label>
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${sortBy === 'mici' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSortBy('mici')}
            >
              Mici Count
            </button>
            <button 
              type="button" 
              className={`btn ${sortBy === 'date-desc' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSortBy('date-desc')}
            >
              Newest First
            </button>
            <button 
              type="button" 
              className={`btn ${sortBy === 'date-asc' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSortBy('date-asc')}
            >
              Oldest First
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
            <p className="text-muted">No grills uploaded yet.</p>
          </div>
        ) : (
          <>
            {topThree.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-4">Top Pimps</h3>
                <div className="row g-4">
                  {topThree.map((grill, index) => (
                    <div key={grill._id} className="col-md-4">
                      <div className="card h-100 shadow-lg border-warning">
                        <div className="card-header bg-warning text-center py-3">
                          <h2 className="mb-0">{getMedalEmoji(index)}</h2>
                        </div>
                        <img 
                          src={`http://localhost:3000/${grill.photoUrl}`} 
                          className="card-img-top" 
                          alt={grill.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{grill.name}</h5>
                          <p className="card-text">
                            <span className="badge bg-secondary me-2">{grill.menu}</span>
                            <span className="fw-bold">
                              <img src="/Mici_Rumeniti.png" alt="mici" style={{width: '20px', height: '20px', marginRight: '4px'}} />
                              {grill.mici} mici
                            </span>
                          </p>
                          <p className="card-text small text-muted">
                            by {grill.creatorId?.username || 'Unknown'}
                          </p>
                          {grill.description && (
                            <p className="card-text small">{grill.description}</p>
                          )}
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                          <button 
                            className={`btn btn-sm w-100 ${grill.isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => handleLike(grill._id)}
                            disabled={!isAuthenticated}
                          >
                            <img 
                              src={grill.isLiked ? '/Mici_Rumeniti.png' : '/Mici_Cruzi.png'} 
                              alt="mic" 
                              style={{width: '20px', height: '20px', marginRight: '4px'}} 
                            />
                            {grill.isLiked ? 'Take Back Mic' : 'Give a Mic!'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {restOfGrills.length > 0 && (
              <div>
                <h3 className="mb-4">All Grills</h3>
                <div className="row g-4">
                  {restOfGrills.map((grill, index) => (
                    <div key={grill._id} className="col-md-6 col-lg-4">
                      <div className="card h-100 shadow-sm">
                        <img 
                          src={`http://localhost:3000/${grill.photoUrl}`} 
                          className="card-img-top" 
                          alt={grill.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title mb-0">{grill.name}</h5>
                            <span className="badge bg-light text-dark">#{index + 4}</span>
                          </div>
                          <p className="card-text">
                            <span className="badge bg-secondary me-2">{grill.menu}</span>
                            <span className="text-muted">
                              <img src="/Mici_Rumeniti.png" alt="mici" style={{width: '18px', height: '18px', marginRight: '4px'}} />
                              {grill.mici} mici
                            </span>
                          </p>
                          <p className="card-text small text-muted">
                            by {grill.creatorId?.username || 'Unknown'}
                          </p>
                          {grill.description && (
                            <p className="card-text small text-muted">{grill.description}</p>
                          )}
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                          <button 
                            className={`btn btn-sm w-100 ${grill.isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => handleLike(grill._id)}
                            disabled={!isAuthenticated}
                          >
                            <img 
                              src={grill.isLiked ? '/Mici_Rumeniti.png' : '/Mici_Cruzi.png'} 
                              alt="mic" 
                              style={{width: '18px', height: '18px', marginRight: '4px'}} 
                            />
                            {grill.isLiked ? 'Take Back Mic' : 'Give a Mic!'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
