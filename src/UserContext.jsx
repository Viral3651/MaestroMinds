import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Load initial user state from localStorage if it exists
  const getInitialUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {
      firstName: '',
      lastName: '',
      role: '',
      isLoggedIn: false
    };
  };

  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    // Update localStorage whenever user state changes
    if (user.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
