import React , { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { FaBrain } from 'react-icons/fa'

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const{pathname}= useLocation()

  const[MouseOverColor, setMouseOverColor] = useState(null);
  const mouseOveron=()=>{
    setMouseOverColor('#E8CCEB')
  }
  const mouseOveroff=()=>{
    setMouseOverColor(null)
  }
  const isActive = () => {
    window.scrollY>0 ? setActive(true) : setActive(false)
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, []);
  const currentUser = {
    id:1,
    username:"Sapnish Sharma",
    isTutor:true
  }
  return (
    <div className={active || pathname!=="/" ? "navbar active" : 'navbar'}>
        <div className="container">
            <div className="logo">
              <Link to='/' className='link'>
                <span className='text'>MaestroMinds </span>
              </Link>
                <span className='brain'><FaBrain size={20}/></span>
            </div>
            <div className='links'>
                <div className="list">
                    <Link to='/' className='link'>Home</Link>
                    <Link to='/about' className='link'>About Us</Link>
                    {!currentUser ?.isTutor &&<Link to ='/login'>Log In</Link>}
                    {!currentUser ?.isTutor && <Link to ='/Tutorregistration'>Tutor Registration</Link>}
                    {!currentUser ?.isTutor &&<Link to ='/tutors'>Find a Tutor</Link>}
                    {!currentUser ?.isTutor &&<Link Link to ='/mytutors'>My Tutors</Link>}
                    {!currentUser ?.isTutor &&<Link to ='/settings'>Settings</Link>}
                    {!currentUser ?.isTutor &&<button style={
                      {backgroundColor:MouseOverColor}} 
                      onMouseOver={mouseOveron} onMouseOut={mouseOveroff}>Join Now</button>}
                    {currentUser && (
                      <div className='user' onClick={()=> setOpen(!open)}> 
                        <img src="./img/profile.jpg" alt="" />
                        <span>{currentUser?.username}</span>
                        {open && <div className='options'>
                            
                            {
                                currentUser?.isTutor &&(
                                    <>
                                    <Link to='/dashboard'className='link'>Tutors Dashboard</Link>
                                    <Link to='/mystudents'className='link'>My Students</Link>
                                    <Link to='/appointments'className='link'>Appointments</Link>
                                    </>
                                )
                            }
                                                  
                            <Link to='/messages'className='link'>Messages</Link>
                            <Link to ='/setting' className='link'>Settings</Link>
                            <Link to='/logout'className='link'>Logout</Link>
                            
                        </div>}
                    </div>
                )}
                  </div>
              
            </div>
        </div>
        {active || pathname!=="/" &&(
        <>
        <hr />
        <div className='menu'>
            <Link className='link' to='/'>Mathematics</Link>
            <Link className='link' to='/'>Computer Science</Link>
            <Link className='link' to='/'>Psychology</Link>
            <Link className='link' to='/'>Biology</Link>
            <Link className='link' to='/'>Physics</Link>
        </div>
        </>)}

    </div>
  )
}

export default Navbar