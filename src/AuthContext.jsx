import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Role can be 'cliente' or 'desenvolvedor'

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole) {
      fetch('/api/validate-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user);
          setRole(userRole);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

