import { useState } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import Login from './Login'
import Navbar from './Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [page, setPage] = useState('main')

  const navigate = (to) => setPage(to)

  return (
    <AuthProvider>
      <Navbar onNavigate={navigate} />
      {page === 'login' ? <Login onBack={() => navigate('main')} /> : <MainMenu onNavigate={navigate} />}
    </AuthProvider>
  )
}

export default App
