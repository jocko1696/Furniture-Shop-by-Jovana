import React, { createContext, useState } from "react";
import axios from "axios";
// import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(null);

  const login = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = async () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    // Cookies.remove('token');
    try {
      const response = await axios.post('http://localhost:5000/logout','',{
        withCredentials: true,
        credentials: 'include'
      }); // Calling the logout route
      // Optionally, update frontend state to reflect logout

      console.log(response);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
