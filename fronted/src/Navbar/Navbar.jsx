import { Link } from 'react-router-dom'
import './navbar.css'
import React from 'react'

function navbar() {
  return (
    <>
    <div className="navbar-container">
    <div className="outer-container">
    <p><Link to="/home" className='no-underline'>Saṃsāra</Link></p>
      <ul>
        <Link to="/home" className='no-underline'><li>Home</li></Link>
        <Link to="/tour" className='no-underline'><li>Tours</li></Link>
        <Link to="/aboutus" className='no-underline'><li>About Us</li></Link>
        <Link to="/contact" className='no-underline'><li>Contact Us</li></Link>
        <Link to="/blog" className='no-underline'><li>Blogs</li></Link>
      </ul>
    </div>
      <div className="navbar-line"></div>
    </div>
    </>
  )
}

export default navbar