import React, { useState } from 'react'
import './Login.css'

function Login({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now just a demo action — replace with real auth call.
    alert(`Signing in as ${email}`)
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
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="button" className="btn btn-link p-0" onClick={onBack}>Back</button>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
