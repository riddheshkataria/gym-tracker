import { useState } from 'react'
import './index.css'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = ()=> !!localStorage.getItem('userInfo');
 
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={isAuthenticated()? <Navigate to= "/dashboard"/>:<Login/>}/>
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}

export default App
