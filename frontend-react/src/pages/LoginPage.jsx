import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { login, isLoggedIn } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const [email, setEmail] = useState('teacher@school.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function onSubmit(e){
    e.preventDefault()
    const res = login(email, password)
    if(res.ok){
      navigate('/students')
    }else{
      setError(res.message || 'Login failed')
    }
  }

  if(isLoggedIn()){
    navigate('/students')
  }

  return (
    <form className="row" onSubmit={onSubmit}>
      <div style={{width:'100%'}}>
        <h2>Teacher Login</h2>
        <p style={{opacity:.8, marginTop:-8}}>Use <b>teacher@school.com</b> / <b>password</b> to continue.</p>
      </div>
      <div style={{display:'grid', gap:12, width:'100%', maxWidth:420}}>
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <Input label="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        {error && <div style={{color:'#ffb3b3'}}>{error}</div>}
        <Button type="submit">Login</Button>
      </div>
    </form>
  )
}
