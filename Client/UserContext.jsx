


import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create UserContext
const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch the user from API or cookies
  const setUserFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    setUserFromAPI();
  }, []); // Fetch only on mount

  return (
    <UserContext.Provider value={{ user, setUser, setUserFromAPI }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
