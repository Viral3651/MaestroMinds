import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./Featured.css";

const Featured = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?q=${searchQuery}`);
    };

    return (
        <div className='featured'>
            <div className='left'>
                <img src="./img/drfrazier.png" alt="" />
            </div>
            <div className='container'>
                <div className='right'>
                    <h1>Discover Your Ideal Maestro</h1>
                    <div className='search'>
                        <div className='searchContainer'>
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder='Find your Maestro' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className='popular'>
                        <span>Popular Searches:</span>
                        <button onClick={() => setSearchQuery('Mathematics')}>Mathematics</button>
                        <button onClick={() => setSearchQuery('Comp. Science')}>Comp. Science</button>
                        <button onClick={() => setSearchQuery('Physics')}>Physics</button>
                        <button onClick={() => setSearchQuery('Chemistry')}>Chemistry</button>
                        <button onClick={() => setSearchQuery('Biology')}>Biology</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
