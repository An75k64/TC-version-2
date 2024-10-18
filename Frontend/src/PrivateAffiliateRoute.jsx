// PrivateAffiliateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const PrivateAffiliateRoute = ({ children }) => {
  const { isAffiliateAuthenticated } = React.useContext(AuthContext);
  if (!isAffiliateAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateAffiliateRoute;
