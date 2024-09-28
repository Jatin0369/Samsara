import React from 'react'
import './Bg.css'
function Bg({heading}) {
  return (
    <div className="outer-about">
    <div className="background-layer"></div>
    <div className="heading">
      <h3>{heading}</h3>
    </div>
  </div>
  )
}

export default Bg