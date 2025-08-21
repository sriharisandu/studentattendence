import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import StudentsPage from './pages/StudentsPage'
import SummaryPage from './pages/SummaryPage'
import './App.css'
import { isLoggedIn, logout } from './services/auth'

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="row" style={{alignItems:'center'}}>
        <span style={{fontWeight:700}}>🎓 Student Attendance</span>
        <span className="tag">React + Spring Boot + MySQL</span>
      </div>
      <div className="nav">
        <Link to="/students" className="btn">Mark Attendance</Link>
        <Link to="/summary" className="btn">Summary</Link>
        {isLoggedIn() ? (
          <button className="btn" onClick={()=>{logout(); navigate('/')}}>Logout</button>
        ) : (
          <Link to="/" className="btn">Login</Link>
        )}
      </div>
    </div>
  )
}

export default function App(){
  return (
    <div className="container">
      <Header />
      <div className="card">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
      <footer>© {new Date().getFullYear()} Attendance Dashboard</footer>
    </div>
  )
}
