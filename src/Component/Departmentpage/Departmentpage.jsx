import React from 'react'
import Department from './Department.css'
const Department = (tutor) => {
  return (
    <div className='department'>
        <Link to= "/tutorcard/123">
        <img src={tutor.img} alt="" />
        <div className="info">
            <div className="user">
                <span>{tutor.user}</span>
                <span>{tutor.desc}</span>
            </div>
        </div>
        <div className="Details">
            <div className="availability">
                <span>{tutor.availability}</span>
                <h2>${tutor.price}/hr</h2>
            </div>

        </div>
        </Link>
    </div>
  )
}

export default Department