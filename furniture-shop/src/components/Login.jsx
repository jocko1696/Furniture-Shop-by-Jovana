import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/useAuthContext";

const Login = () => {

    const { isLoggedIn , login } = useContext(AuthContext);


    const [formData, setFormData] = React.useState({

        email: "",
        password: "",
    })
    const [token, setToken] = React.useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', formData, {
                withCredentials: true,
                credentials: 'include'
            }).then(function (response) {
                // localStorage.setItem('token', response.data.data.token);
                login(response.data.data.token);
                // Check if the user is an admin
                if (response.data.data.isAdmin) {
                    navigate("/administration"); // Redirect to admin page
                } else {
                    navigate("/"); // Redirect to user dashboard or other route
                }
            })
                .catch(function (error) {
                    console.log(error);
                });



        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex items-center justify-center max-w-[400px] mx-auto">
            <form className="loginUserForm w-full" onSubmit={handleSubmit}>
                <h3 className="text-center sectionHeadingText">Login</h3>
                <p className="flex justify-center">Please login using account detail below.</p>
                <div className="flex justify-center flex-col loginUserFormInput">
                    <input
                        type="email"
                        placeholder="E-Mail"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        className="w-full"

                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        className="w-full"
                    />
                </div>
                <div>
                    <NavLink to="/forgot-password" className="hover:text-pink-600">Forgot your password?</NavLink>
                </div>
                <div className="flex justify-center">
                    <button id="loginSubmitBtn" className="w-full" type="submit">Sign In</button>
                </div>


                <p className="flex justify-center">
                    Don't have an Account? <NavLink to="/register" className="hover:text-pink-600 mx-[4px]"> Create
                    account</NavLink>
                </p>


            </form>
        </div>
    );
};

export default Login;