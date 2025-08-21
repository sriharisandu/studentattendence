import React from 'react'
export default function Input({label, ...props}){
  return (
    <label style={{display:'grid', gap:6}}>
      <span>{label}</span>
      <input className="input" {...props} />
    </label>
  )
}
