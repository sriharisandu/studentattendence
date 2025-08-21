import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_BASE,
})

// Attach fake token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
