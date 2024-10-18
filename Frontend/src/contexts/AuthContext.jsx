import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For Admin
  const [isAffiliateAuthenticated, setIsAffiliateAuthenticated] = useState(false); // For Affiliate
  const [affiliateId, setAffiliateId] = useState(null); // Store affiliate ID
  const navigate = useNavigate();

  // Check for admin and affiliate authentication on load
  useEffect(() => {
    // Admin authentication
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Affiliate authentication
    const affiliateToken = localStorage.getItem('affiliateToken');
    if (affiliateToken) {
      setIsAffiliateAuthenticated(true);
    } else {
      setIsAffiliateAuthenticated(false);
    }

    // Optional: retrieve and store affiliateId from localStorage if needed
    const storedAffiliateId = localStorage.getItem('affiliateId');
    if (storedAffiliateId) {
      setAffiliateId(storedAffiliateId);
    }
  }, []);

  // Admin login
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  // Affiliate login
  const loginAffiliate = (token, id) => {
    localStorage.setItem('affiliateToken', token);
    setIsAffiliateAuthenticated(true);
    setAffiliateId(id); // Store the affiliate ID in state
    localStorage.setItem('affiliateId', id); // Optional: persist in localStorage if needed
  };

  // Admin logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/admin'); // Redirect to admin login page after logout
  };

  // Affiliate logout
  const logoutAffiliate = () => {
    localStorage.removeItem('affiliateToken');
    setIsAffiliateAuthenticated(false);
    setAffiliateId(null); // Clear affiliate ID on logout
    localStorage.removeItem('affiliateId'); // Optional: remove from localStorage
    navigate('/affiliate-login'); // Redirect to affiliate login page after logout
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        isAffiliateAuthenticated, 
        loginAffiliate, 
        logoutAffiliate, 
        affiliateId // Provide affiliateId to the context
      }}>
      {children}
    </AuthContext.Provider>
  );
};
