import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchFavorites();
  }, []);

  const fetchUser = async () => {
    const res = await api.get('/api/authenticated');
    setUser(res.data);
    setIsAuthenticated(true);
  };

  const fetchPost = async () => {
    const res = await api.get('/api/posts');
    setPosts(res.data);
  };

  const fetchFavorites = async () => {
    const res = await api.get('/api/favorite/posts');
    setFavorites(res.data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        favorites,
        setFavorites,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
