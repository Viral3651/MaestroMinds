
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tutorscard } from '../../data';
import './SearchResults.css';  

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(location.search).get('q') || '';
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState(searchQuery);

    useEffect(() => {
        const results = tutorscard.filter((tutor) => 
            tutor.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tutor.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    }, [searchQuery]);

    const handleFilter = (category) => {
        setFilter(category);
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search?q=${query}`);
    };

    const handleCardClick = (id) => {
        navigate(`/tutor/${id}`);
    };

    const filteredResults = searchResults.filter((tutor) => 
        filter ? tutor.desc.toLowerCase().includes(filter.toLowerCase()) : true
    );

    return (
        <div className="search-results-page">
            <div className="filters">
                <button onClick={() => handleFilter('')}>All</button>
                <button onClick={() => handleFilter('Mathematics')}>Mathematics</button>
                <button onClick={() => handleFilter('Comp. Science')}>Comp. Science</button>
                <button onClick={() => handleFilter('Physics')}>Physics</button>
                <button onClick={() => handleFilter('Chemistry')}>Chemistry</button>
                <button onClick={() => handleFilter('Biology')}>Biology</button>
            </div>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search tutors" 
                    value={query} 
                    onChange={handleSearchChange} 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {filteredResults.map((tutor) => (
                    <div 
                        key={tutor.id} 
                        className="tutor-card"
                        onClick={() => handleCardClick(tutor.id)}
                    >
                        <img src={tutor.img} alt={tutor.user} />
                        <h2>{tutor.user}</h2>
                        <p>{tutor.desc}</p>
                        <p>Charge: {tutor.charge}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
