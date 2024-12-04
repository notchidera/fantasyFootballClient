// UsersProvider.jsx - Updated for Stock App
import { createContext, useState, useEffect } from 'react';
import apiCall from '../utils/api';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiCall('get', '/api/users/me');
        setUser(response.data.data.user);
        setIsLoggedIn(true);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const response = await apiCall('post', '/api/users/login', credentials);
    setUser(response.data.data.user);
    setIsLoggedIn(true);
  };

  const signup = async (credentials) => {
    const response = await apiCall('post', '/api/users/signup', credentials);
    setUser(response.data.data.user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await apiCall('post', '/api/users/logout');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UsersContext.Provider value={{ user, isLoggedIn, isLoading, login, signup, logout }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

// -------------------------------
