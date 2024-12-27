import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('❌ Error decoding token:', err);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
