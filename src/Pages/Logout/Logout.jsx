import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user information
    setUser({
      firstName: '',
      lastName: '',
      role: '',
      isLoggedIn: false
    });

    // Redirect to login page
    navigate('/login');
  }, [setUser, navigate]);

  return "Logging out..."; 
};

export default Logout;
