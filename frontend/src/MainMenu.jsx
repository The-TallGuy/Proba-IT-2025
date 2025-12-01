import React from 'react'
import './MainMenu.css'

function MainMenu() {
  return (
    <div className="mainmenu-root">
      <header className="mainmenu-header">
        <div className="mm-left">
          <img className="mm-logo" src="/logos/header_logo.png" alt="Pimp Your Grill" />
        </div>

        <div className="mm-right">
          <button className="mm-btn mm-ghost">Account</button>
          <button className="mm-btn mm-primary">Leaderboard</button>
        </div>
      </header>

      <main className="mainmenu-content">
        <img className="mm-mainlogo" src="/logos/main_logo.png" alt="Pimp Your Grill" />
      </main>

      <footer className="mainmenu-footer">
        <div className="mm-socials" aria-hidden="false">
          <a href="https://www.instagram.com/lsacbucuresti" target="_blank" rel="noopener" aria-label="Instagram" className="social">
            <img src="/icons/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/LsacBucuresti" target="_blank" rel="noopener" aria-label="Facebook" className="social">
            <img src="/icons/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/@LSACBucuresti" target="_blank" rel="noopener" aria-label="YouTube" className="social">
            <img src="/icons/youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.twitch.tv/lsac_bucuresti" target="_blank" rel="noopener" aria-label="Twitch" className="social">
            <img src="/icons/twitch.png" alt="Twitch" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default MainMenu