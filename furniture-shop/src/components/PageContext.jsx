import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    const login = (token) => {
        localStorage.setItem("token", token);
        setLoggedIn(true);
    };

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
        Cookies.remove('token');
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
