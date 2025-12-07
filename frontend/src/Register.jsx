import { useState } from 'react'
import './Login.css'
import axiosInstance from './utils/axiosConfig'

function Register({ onBack, onSuccess }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!')
      return
    }
    setLoading(true)

    try {
      await axiosInstance.post('/users/signup', {
        username,
        email,
        password
      })

      alert('Account created successfully! Please log in.')
      onSuccess()
    } catch (err) {
      console.error('Signup error:', err)
      if (err.response) {
        setError(err.response.data || 'Registration failed. Please try again.')
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
          <h3 className="card-title text-center mb-3">Create Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                minLength="3"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                minLength="6"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
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
                Back to Login
              </button>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
