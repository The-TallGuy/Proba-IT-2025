import { useState } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import Login from './Login'
import Register from './Register'
import MyGrills from './MyGrills'
import GrillUpload from './GrillUpload'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [page, setPage] = useState('main')

  const navigate = (to) => setPage(to)

  const renderPage = () => {
    switch(page) {
      case 'login':
        return <Login onBack={() => navigate('main')} onRegister={() => navigate('register')} />
      case 'register':
        return <Register onBack={() => navigate('login')} onSuccess={() => navigate('login')} />
      case 'profile':
        return <MyGrills onBack={() => navigate('main')} onUpload={() => navigate('upload')} />
      case 'upload':
        return <GrillUpload onBack={() => navigate('profile')} onSuccess={() => navigate('profile')} />
      case 'leaderboard':
        return <Leaderboard onBack={() => navigate('main')} />
      default:
        return <MainMenu onNavigate={navigate} />
    }
  }

  return (
    <AuthProvider>
      <Navbar onNavigate={navigate} />
      {renderPage()}
    </AuthProvider>
  )
}

export default App
