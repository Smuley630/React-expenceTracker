import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

 

  const [isverified, setIsverified] = useState(false);
  useEffect(() => {
    const storedVerified = localStorage.getItem('isVerified');
    console.log("...storedVerified",storedVerified)
    if (storedVerified === 'true') {
        setIsverified(true);
    }
}, [])

const handleSetVerified = (value) => {
  console.log("....,handleSetVerified",value)
  setIsverified(value);
  localStorage.setItem('isVerified', value); 
};

  return (
    <AuthContext.Provider value={{ isverified, setIsverified: handleSetVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
