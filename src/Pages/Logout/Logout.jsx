import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user information in context and local storage
    setUser({
      firstName: '',
      lastName: '',
      role: '',
      isLoggedIn: false
    });
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  }, [setUser, navigate]);

  return null;
};

export default Logout;
