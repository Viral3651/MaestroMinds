import React from 'react'
import "./Home.css"
import Featured from '../../Component/Featured/Featured';
const Home = () => {
    console.log('Home component is being rendered!');
  return (
    <div className='home'>
        <>
        <Featured/>
        </>
    </div>
  )
}

export default Home