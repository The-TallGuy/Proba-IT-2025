import './MainMenu.css'

function MainMenu(props) {
  const onNavigate = props.onNavigate || (() => {})

  return (
    <div className="mainmenu-root">
      <main className="mainmenu-content container d-flex align-items-center justify-content-center">
        <img className="mm-mainlogo" src="/logos/decorated_logo.png" alt="Pimp Your Grill" />
      </main>

      <footer className="mainmenu-footer">
        <div className="container d-flex justify-content-center py-3">
          <div className="d-flex align-items-center gap-3">
            <a href="https://www.instagram.com/lsacbucuresti" target="_blank" rel="noopener" aria-label="Instagram" className="social mx-2">
              <img src="/icons/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/LsacBucuresti" target="_blank" rel="noopener" aria-label="Facebook" className="social mx-2">
              <img src="/icons/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/@LSACBucuresti" target="_blank" rel="noopener" aria-label="YouTube" className="social mx-2">
              <img src="/icons/youtube.png" alt="YouTube" />
            </a>
            <a href="https://www.twitch.tv/lsac_bucuresti" target="_blank" rel="noopener" aria-label="Twitch" className="social mx-2">
              <img src="/icons/twitch.png" alt="Twitch" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainMenu