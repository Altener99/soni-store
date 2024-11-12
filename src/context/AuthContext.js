// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Check localStorage for existing auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authToken') ? true : false;
  });

  // Sign in and save token in localStorage
  const signIn = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  // Logout and remove token from localStorage
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
