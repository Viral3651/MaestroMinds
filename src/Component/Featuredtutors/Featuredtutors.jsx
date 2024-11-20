import React from 'react'
import "./Featuredtutors.css"
import {Link} from "react-router-dom"

const Featuredtutors = ({item}) => {
  return (
    <Link to ='/tutors/123'>
    <div className='featuredtutors'>
       <div>
        <img src={item.img} alt="" />
        </div>
        <span className='user'>{item.user}</span>
        <span className='desc'>{item.desc}</span>
    </div>
    </Link>
  )
}

export default Featuredtutors