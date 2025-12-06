import { useState } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import Login from './Login'
import Navbar from './Navbar'

function App() {
  const [page, setPage] = useState('main')

  const navigate = (to) => setPage(to)

  return (
    <>
      <Navbar onNavigate={navigate} />
      {page === 'login' ? <Login onBack={() => navigate('main')} /> : <MainMenu onNavigate={navigate} />}
    </>
  )
}

export default App
