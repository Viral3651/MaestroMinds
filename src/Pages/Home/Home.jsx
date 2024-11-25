import React from 'react'
import "./Home.css"
import Featured from '../../Component/Featured/Featured';
import Toptutor from '../../Component/Toptutor/Toptutor';
import Tutorfpage from '../../Component/Tutorsfpage/Tutorfpage';
import { FaCheckSquare } from 'react-icons/fa';
const Home = () => {
    console.log('Home component is being rendered!');
  return (
    <div className='home'>
        <>
        <Featured/>
        <Toptutor/>
        <div className='features'>
                <div className='container'>
                    <div className="item">
                    <h1>Your Future Starts Here</h1>
                    
                    <p>Sign up now and unlock your potential.</p>
                        <div className="title">
                            <FaCheckSquare size={20}/> Expert Tutors
                            </div>
                            <p>Access qualified tutors from your university.</p>
                        <div className="title">
                            <FaCheckSquare size={20}/> Flexible Scheduling
                            </div>
                            <p> Book sessions at your convenience.</p>
                        <div className="title">
                            <FaCheckSquare size={20}/> Personalized Learning
                            </div>
                            <p>Get tailored support for your specific needs.</p>
                            </div>
                            
                            </div>
                        
                        <div className="item">
                        <video src="./img/Maestrominds.mp4" controls></video>
                        </div>
                        
                </div>
        <Tutorfpage/>
        </>

    </div>
  )
}

export default Home