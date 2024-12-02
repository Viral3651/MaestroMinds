import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tutorscard } from '../../data';
import './Tutorpage.css';
import DateTimePicker from 'react-datetime-picker';

const Tutorpage = ({ onBookSession }) => {
  const { id } = useParams();
  const tutor = tutorscard.find(tutor => tutor.id === parseInt(id));

  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const currentUser = {
    id: 1,
    username: 'Sapnish Sharma',
    isTutor: false,
    isStudent: false,
  };

  if (!tutor) {
    return <div className="not-found">Tutor not found</div>;
  }

  const handleBookSessionClick = () => {
    setShowDateTimePicker(true);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowDateTimePicker(false);

    // Pass appointment data to the parent or Appointment.jsx
    onBookSession({
      tutorId: tutor.id,
      tutorName: tutor.user,
      date: selectedDate,
    });

    setShowConfirmation(true);

    // Automatically hide confirmation after 3 seconds
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="tutor-page">
      <div className="tutor-profile">
        <img src={tutor.img} alt={tutor.user} className="tutor-img" />
        <h1 className="tutor-name">{tutor.user}</h1>
        <p className="tutor-desc">{tutor.longDesc || tutor.desc}</p>
        <p className="tutor-charge">Charge: {tutor.charge}</p>
        {!currentUser.isTutor && !currentUser.isStudent && (
          <Link to="/register" className="link">
          <button className='Register'>Register Now</button>
          </Link>
        )}
        {currentUser.isTutor && currentUser.isStudent && (
          <button onClick={handleBookSessionClick} className="book-session-btn">
          Book a Session
        </button>
        )}
      </div>

      {showDateTimePicker && (
        <div
          className="datetime-picker-modal"
          onClick={() => setShowDateTimePicker(false)} // Close on background click
        >
          <div
            className="datetime-picker-container"
            onClick={(e) => e.stopPropagation()} // Prevent modal background clicks from closing it
          >
            <h3>Select Date and Time</h3>
            <DateTimePicker onChange={handleDateChange} value={date} autoFocus />
            <button
              onClick={() => setShowDateTimePicker(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Session Booked Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Tutorpage;
