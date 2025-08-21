export function login(email, password){
  // Dummy login on frontend. In production, call backend /api/auth/login
  if(email === 'teacher@school.com' && password === 'password'){
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('teacherId', '1')
    return { ok:true }
  }
  return { ok:false, message:'Invalid credentials (try teacher@school.com / password)' }
}

export function isLoggedIn(){
  return !!localStorage.getItem('token')
}

export function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('teacherId')
}
