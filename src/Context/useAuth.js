// AuthContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [shouldFetchUserDetails, setShouldFetchUserDetails] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    Cookies.remove('authToken');
    setIsLoggedIn(false);
    setCustomerId(null);
    setUserDetails(null);
    navigate('/login'); // Redirect to login page
    },[navigate]);
  
  useEffect(() => {
    const token = Cookies.get('authToken');
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setCustomerId(decodedToken?.data?.user?.id || null);
        setShouldFetchUserDetails(true);
  
        // Initialize userDetails from cookies if available
        const details = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')) : null;
        if (details) {
          setUserDetails(details);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setCustomerId(null);
      setUserDetails(null); 
    }
  },[]); // Add logout as a dependency
  

  const login = (token) => {
    Cookies.set('authToken', token, { expires: 6, secure: true, sameSite: 'Lax' });
    try {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setCustomerId(decodedToken?.data?.user?.id || null);
      setShouldFetchUserDetails(true); // Trigger fetching user details
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, customerId, userDetails, setUserDetails, shouldFetchUserDetails,setCustomerId, setShouldFetchUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
