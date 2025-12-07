import { useState } from 'react'
import './Login.css'
import { useAuth } from './context/AuthContext'
import axiosInstance from './utils/axiosConfig'

function Login({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password
      })
      
      const { token } = response.data
      const tokenPayload = JSON.parse(atob(token.split('.')[1]))
      const userData = {
        id: tokenPayload.id,
        username: tokenPayload.username
      }
      login(userData, token, rememberMe)
      onBack()
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Sign in</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="button" className="btn btn-link p-0" onClick={onBack}>Back</button>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
