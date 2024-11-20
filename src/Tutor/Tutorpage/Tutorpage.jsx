// TutorProfile.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tutorscard } from '../../data';
import './Tutorpage.css';
import DateTimePicker from 'react-datetime-picker';
const Tutorpage = () => { 
    const { id } = useParams(); 
    const tutor = tutorscard.find(tutor => tutor.id === parseInt(id));
    const[date, setDate]= useState(new Date());
    const[showDateTimePicker, setShowDateTimePicker]= useState(false);
    if (!tutor) {
         return <div>Tutor not found</div>; 
        } 
    const handleBookSessionClick= () => {
        setShowDateTimePicker(true);
    }
    const handleDateChange = (selectedDate) => { 
        setDate(selectedDate); 
        setShowDateTimePicker(false); 

        };
    return ( 
        <div className='wholepage'>
        <div className="tutor-profile"> 
        <img src={tutor.img} alt={tutor.user} /> 
        <h2>{tutor.user}</h2> 
        <p>{tutor.desc}</p> 
        <p>Charge: {tutor.charge}</p> 
        <button onClick={handleBookSessionClick}>Book a Session</button> 
        {showDateTimePicker && ( <div className="datetime-picker"> 
            <DateTimePicker onChange={handleDateChange} value={date} />
        </div> )}
        </div>
        </div>
        ); };
export default Tutorpage;
