import React, { useState, useEffect } from 'react';
import './Appointments.css';

const Appointment = ({ appointments = [], cancelAppointment }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      // Sort appointments by date and filter out past appointments
      const sortedAppointments = appointments
        .filter(appointment => new Date(appointment.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setUpcomingAppointments(sortedAppointments);
    }
  }, [appointments]);

  const handleCancel = (appointmentId) => {
    // Handle the cancellation logic and update the list
    cancelAppointment(appointmentId);
  };

  return (
    <div className="appointment-page">
      <h2>Upcoming Appointments</h2>
      {upcomingAppointments.length === 0 ? (
        <p>No upcoming appointments</p>
      ) : (
        <ul className="appointment-list">
          {upcomingAppointments.map((appointment, index) => (
            <li key={index} className="appointment-item">
              <div className="appointment-details">
                <div>
                  <strong>Tutor:</strong> {appointment.tutorName}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}
                </div>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="cancel-appointment-btn"
                >
                  Cancel Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointment;
