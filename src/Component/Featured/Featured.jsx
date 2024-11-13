import React from 'react'
import "./Featured.css"
import { FaSearch } from 'react-icons/fa';
const Featured = () => {
  return (
    <div className='featured'>
        <div className='left'>
                <img src= "./img/drfrazier.png" alt="" />
            </div>
        <div className='container'>
            <div className='right'>
                <h1>Discover Your Ideal Maestro</h1>
                <div className='search'>
                 <div className='searchContainer'>
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder= 'Find your Maestro' />
                    
                    </div>
                    <button>Search</button>
               </div> 
               <div className='popular'>
                   <span>Popular Searches:</span>
                   <button>CM333</button>
                   <button>CM332</button>
                   <button>MA152</button>
                   <button>MA116</button>
                   <button>CM307</button>
               </div>
            </div>
           
        </div>
    </div>
  )
}

export default Featured