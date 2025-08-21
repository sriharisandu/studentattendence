import React from 'react'
export default function Button({children, ...props}){
  return <button className="btn" {...props}>{children}</button>
}
