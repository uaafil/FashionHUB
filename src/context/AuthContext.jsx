import { createContext, useContext, useState } from 'react';
import authService from '../services/Auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      const userInfo = {
        email: response.email,
        token: response.token,
        roles: response.roles || []  // ✅ Important: Save roles
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
