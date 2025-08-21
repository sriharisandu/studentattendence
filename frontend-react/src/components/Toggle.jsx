import React from 'react'
export default function Toggle({value, onChange}){
  return (
    <div className="toggle">
      <button className={!value ? 'active' : ''} onClick={()=>onChange(false)}>Absent</button>
      <button className={value ? 'active' : ''} onClick={()=>onChange(true)}>Present</button>
    </div>
  )
}
