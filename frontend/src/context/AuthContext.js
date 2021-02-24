import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (localStorage.token) {
      const res = await api.get('/api/authenticated');
      setUser(res.data);
      setIsAuthenticated(true);
      setIsLoaded(true);
    }
  };

  return (
    <>
      {isLoaded ? (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        ''
      )}
    </>
  );
}
