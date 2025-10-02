import { useState, useContext, createContext } from 'react';
import { authApi } from '../services';
import useLocalStorage from './useLocalStorage'; // Change this line - default import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'aias_token', null);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Test credentials
      const validCredentials = {
        email: 'test@admin.com',
        password: 'admin123'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === validCredentials.email && 
          credentials.password === validCredentials.password) {
        
        // Mock successful response
        const mockResponse = {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            email: credentials.email,
            name: 'Test Admin',
            role: 'admin'
          }
        };

        setToken(mockResponse.token);
        setUser(mockResponse.user);
        return mockResponse;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;