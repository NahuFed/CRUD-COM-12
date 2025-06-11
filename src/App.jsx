import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import Login from './pages/Login'
import './App.css'

function App() {


  return (
    <>

    <Header />
    <div className='main-content'>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
