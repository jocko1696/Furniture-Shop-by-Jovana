import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/useAuthContext";
import {toast} from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css';
import JSEncrypt from "jsencrypt";
import { publicKey } from "../../backend/keys/publicKey";


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

            // Encrypt the password using the public key
            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey);
            const encryptedPassword = encryptor.encrypt(formData.password);

            // Check if the encryption was successful
            if (!encryptedPassword) {
                console.error("Password encryption failed!");
                toast.error("Password encryption failed!");
                return;
            }

            // Prepare the data to send to the server
            const data = {
                email: formData.email,
                encryptedPassword, // Send the encrypted password
            };

            // Send POST request to backend
            const response = await axios.post('http://localhost:5000/login', data, {
                withCredentials: true, // Ensures cookies are sent with the request
                credentials: 'include', // Allow credentials
            });

            // Handle response
            if (response.data.success) {
                // Store token in localStorage or manage it according to your needs
                localStorage.setItem('token', response.data.data.token);
                login(response.data.data.token);
                toast.success("Login successful!");

                // Redirect based on user role
                if (response.data.data.role==='admin') {
                    navigate("/administration");
                } else {
                    navigate("/");
                }
            } else {
                console.log("Login failed: ", response.data.message);
                toast.error(response.data.message || "Login failed. Please try again.");

            }
        } catch (error) {
            console.error("Error during login: ", error);
            toast.error("An error occurred during login. Please try again.");
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