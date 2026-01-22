import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
  };
  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: 40}}>Loading...</div>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
