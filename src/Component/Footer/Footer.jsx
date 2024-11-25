
    import React from 'react'
    import './Footer.css'
    import { FaFacebookSquare } from 'react-icons/fa'
    import { FaInstagramSquare } from 'react-icons/fa'
    import { FaLinkedin } from 'react-icons/fa'
    const Footer = () => {
      return (
        <div className='footer'> 
          <div className='container'></div>
          <div className='top'>
           
              <div className='Mathematics'>
                <h2>Mathematics</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
                <div className='Physics'>
                <h2>Physics</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
                <div className='Biology'>
                <h2>Biology</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
                <div className='CS'>
                <h2>Computer Science</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
                <div className='Music'>
                <h2>Music</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
                <div className='Writing'>
                <h2>Writing Center</h2>
                <span>Tutors availabilty</span>
                <span>Book a session</span>
                <span>Learn more</span>
                </div>
    
          </div>
          <div className='bottom'>
            <div className='left'>
              <span><img src="./img/logo.png" alt="" /></span>
              <h2>MaestroMinds</h2>
              <span>Copyright © 2024 MaestroMinds</span>
            </div>
            <div className='right'>
              <div className='social'>
                <FaFacebookSquare size={30} />
                <FaInstagramSquare size={30} />
                <FaLinkedin size={30} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    export default Footer  