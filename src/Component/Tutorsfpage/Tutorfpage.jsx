import React from 'react';
import './Tutorfpage.css';
import { FaCheckSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Tutorfpage = () => {
  return (
    <div className='tutorfpage'>
      <div className='tutor-features'>
        <div className='container'>
          <div className='description'>
            <h1>Share Your Knowledge, Shape the Future.</h1>
            <h1>Be a Tutor Today!</h1>
            <p>Make a difference in a student's life.</p>
            <div className='title'>
              <FaCheckSquare size={20}/> Professional Development Opportunities
            </div>
            <p>Access resources to enhance your teaching skills.</p>
            <div className='title'>
              <FaCheckSquare size={20}/> Flexible Scheduling
            </div>
            <p>Choose your own hours and work-life balance.</p>
            <div className='title'>
              <FaCheckSquare size={20}/> Competitive Earnings
            </div>
            <p>Earn a rewarding income for your expertise.</p>
          </div>
          <div className='image'>
            <img src="./img/tutor.jpg" alt="Tutor" />
          </div>
        </div>
        <Link to="/Tutorregistration" className="link">
        <button className='btn'>Become a Maestro</button> </Link>
      </div>
    </div>
  );
}

export default Tutorfpage;
