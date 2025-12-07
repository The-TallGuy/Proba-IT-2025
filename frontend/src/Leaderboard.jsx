import { useState, useEffect } from 'react'
import './MainMenu.css'
import axiosInstance from './utils/axiosConfig'

function Leaderboard({ onBack }) {
  const [grills, setGrills] = useState([])
  const [sortBy, setSortBy] = useState('mici')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
                            <span className="fw-bold">🔥 {grill.mici} mici</span>
                          </p>
                          <p className="card-text small text-muted">
                            by {grill.creatorId?.username || 'Unknown'}
                          </p>
                          {grill.description && (
                            <p className="card-text small">{grill.description}</p>
                          )}
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
                            <span className="text-muted">🔥 {grill.mici} mici</span>
                          </p>
                          <p className="card-text small text-muted">
                            by {grill.creatorId?.username || 'Unknown'}
                          </p>
                          {grill.description && (
                            <p className="card-text small text-muted">{grill.description}</p>
                          )}
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
