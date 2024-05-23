// // PageContext.js
// import React, {createContext, useContext, useEffect, useState} from 'react';
// import Cookies from "js-cookie";
//
// const PageContext = createContext(null);
//
// export const PageProvider = ({children}) => {
//     const [currentPage, setCurrentPage] = useState('');
//
//     const setPage = (page) => {
//         // console.log('PAGE: ',page);
//         setCurrentPage(page);
//     };
//
//
//     const [loggedIn, setLoggedIn] = useState(false);
//
//     const setLoginState = (token) => {
//         if (token) {
//             setLoggedIn(true);
//         } else {
//             setLoggedIn(false);
//         }
//         console.log(loggedIn);
//     }
//
//
//     return (
//         <PageContext.Provider value={{currentPage, setPage, loggedIn, setLoginState}}>
//             {children}
//         </PageContext.Provider>
//     );
// };
//
// export const usePage = () => useContext(PageContext);
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
