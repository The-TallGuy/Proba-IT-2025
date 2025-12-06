import React from 'react'
import './MainMenu.css'

function Navbar({ onNavigate = () => {} }) {
  return (
    <header className="navbar fixed-top navbar-expand-lg py-3">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img className="mm-logo" src="/logos/header_logo.png" alt="Pimp Your Grill" />
        </a>

        <div className="d-flex align-items-center ms-auto nav-buttons">
          <button type="button" className="btn btn-outline-light" onClick={() => onNavigate('login')}>Account</button>
          <button type="button" className="btn btn-light">Leaderboard</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
