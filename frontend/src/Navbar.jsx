import React from 'react'
import './MainMenu.css'
import { useAuth } from './context/AuthContext'

function Navbar({ onNavigate = () => {} }) {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onNavigate('main')
  }

  return (
    <header className="navbar fixed-top navbar-expand-lg py-3">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => onNavigate('main')}>
          <img className="mm-logo" src="/logos/header_logo.png" alt="Pimp Your Grill" />
        </a>

        <div className="d-flex align-items-center ms-auto nav-buttons">
          {isAuthenticated ? (
            <>
              <span className="text-light me-3">Welcome, {user?.username}!</span>
              <button type="button" className="btn btn-outline-light me-2" onClick={() => onNavigate('profile')}>
                Profile
              </button>
              <button type="button" className="btn btn-outline-light me-2" onClick={() => onNavigate('leaderboard')}>
                Leaderboard
              </button>
              <button type="button" className="btn btn-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-outline-light" onClick={() => onNavigate('login')}>Account</button>
              <button type="button" className="btn btn-light" onClick={() => onNavigate('leaderboard')}>Leaderboard</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
