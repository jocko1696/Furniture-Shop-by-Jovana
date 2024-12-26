import React, {useContext, useState} from 'react';
import axios from 'axios';
import validate from 'validate.js';
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/useAuthContext";
import {toast} from 'react-toastify'; // Importing toast
import {JSEncrypt} from "jsencrypt";
import {publicKey} from "../../backend/keys/publicKey";


//Constraints to forbid incorrect data enter
const constraints = {

    email: {

        presence: {
            allowEmpty: false,
            message: "field is required!",
        },

        email: {
            message: 'must be a valid email address',
        },

        // format: {
        //     pattern: "^[a-zA-ZćčđšžĆČĐŠŽ\\s]+$|^[а-шђјљњћџА-ШЂЈЉЊЋЏ\\s]+$",
        //     flags: "i",
        //     message: "cannot contain interpunction"
        //     }

    },
    password: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
        length: {
            minimum: 8,
            message: 'must be at least 8 characters',
        },

    },
    firstName: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },
    city: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },

    street: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },
    streetNumber: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },

    postalCode: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },
    phone: {
        presence: {
            allowEmpty: false,
            message: "field is required!",
        },
    },

};

const Register = () => {

    const {isLoggedIn, login} = useContext(AuthContext);
    const [formData, setFormData] = React.useState({

        email: "",
        password: "",
        firstName: "",
        lastName: "",
        street: "",
        streetNumber: "",
        postalCode: "",
        phone: "",
        city: "",
    })


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(<p className="success-message"></p>);
    const [token, setToken] = useState('');
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

        // Perform form validation (if needed)
        const validationErrors = validate(formData, constraints);  // Assuming validate function is defined
        setErrors(validationErrors || {});

        if (!validationErrors) {
            try {
                // Encrypt the password before sending it
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(publicKey);

                const encryptedPassword = encrypt.encrypt(formData.password);
                if (!encryptedPassword) {
                    toast.error("Failed to encrypt password");
                    return;
                }

                // Create a new object with the encrypted password
                const formDataWithEncryptedPassword = {
                    ...formData,
                    encryptedPassword: encryptedPassword,
                };

                // Send encrypted password and other data to backend
                const response = await axios.post('http://localhost:5000/register', formDataWithEncryptedPassword, {
                    withCredentials: true,
                    credentials: 'include',
                });


                // If registration is successful
                localStorage.setItem('token', response.data.data.token);
                login(response.data.data.token);
                toast.success("Registration successful!");
                navigate("/"); // Navigate after a short delay if needed
            } catch (error) {
                // Handle error response
                const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
                toast.error(errorMessage);
            }
        }
    };


    return (
        <div className="centerContainer">
            <form onSubmit={handleSubmit} className="registerUserForm">
                <h3 className="text-center sectionHeadingText">Register</h3>
                <p className="flex justify-center">Please enter your personal data.</p>

                <div className="grid grid-cols-2 gap-2">
                    <h3>Customer information</h3>
                    <div className="flex justify-end">Already have an account? <Link to="/login">Log In</Link></div>
                </div>
                <div className="flex flex-col">
                    <input
                        type="email"
                        placeholder="E-Mail"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        className="w-full"

                    />
                    {errors.email && (
                        <p className="error flex">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                    fill="#CB1E1E"/>
                                <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                <path
                                    d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                    fill="#CB1E1E"/>
                            </svg>
                            {errors.email[1]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        className="w-full"
                    />
                    {errors.password && (
                        <p className="error flex">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                    fill="#CB1E1E"/>
                                <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                <path
                                    d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                    fill="#CB1E1E"/>
                            </svg>
                            {errors.password[1]}
                        </p>
                    )}

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <input
                            type="text"
                            placeholder="First name"
                            onChange={handleChange}
                            name="firstName"
                            value={formData.firstName}
                            className="w-full"
                        />
                        {errors.firstName && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last name"
                            onChange={handleChange}
                            name="lastName"
                            value={formData.lastName}
                            className="w-full"
                        />
                        {errors.lastName && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.lastName}
                            </p>
                        )}
                    </div>


                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <input
                            type="text"
                            placeholder="City"
                            onChange={handleChange}
                            name="city"
                            value={formData.city}
                            className="w-full"
                        />
                        {errors.city && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.city}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Street"
                            onChange={handleChange}
                            name="street"
                            value={formData.street}
                            className="w-full"
                        />
                        {errors.street && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.street}
                            </p>
                        )}
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <input
                            type="text"
                            placeholder="Street number"
                            onChange={handleChange}
                            name="streetNumber"
                            value={formData.streetNumber}
                            className="w-full"
                        />
                        {errors.streetNumber && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.streetNumber}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Postal code"
                            onChange={handleChange}
                            name="postalCode"
                            value={formData.postalCode}
                            className="w-full"
                        />
                        {errors.postalCode && (
                            <p className="error flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                        fill="#CB1E1E"/>
                                    <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                    <path
                                        d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                        fill="#CB1E1E"/>
                                </svg>
                                {errors.postalCode}
                            </p>
                        )}
                    </div>

                </div>
                <div>
                    <PhoneInput
                        defaultCountry="ua"
                        name="phone"
                        value={formData.phone}
                        onChange={(phone) => setFormData({...formData, phone})}
                        className="w-full"

                    />

                    {errors.phone && (
                        <p className="error">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 13.125C9.8146 13.125 9.63335 13.18 9.47918 13.283C9.32501 13.386 9.20484 13.5324 9.13389 13.7037C9.06293 13.875 9.04436 14.0635 9.08054 14.2454C9.11671 14.4273 9.206 14.5943 9.33711 14.7254C9.46822 14.8565 9.63527 14.9458 9.81713 14.982C9.99898 15.0182 10.1875 14.9996 10.3588 14.9286C10.5301 14.8577 10.6765 14.7375 10.7795 14.5833C10.8825 14.4292 10.9375 14.2479 10.9375 14.0625C10.9375 13.8139 10.8388 13.5754 10.6629 13.3996C10.4871 13.2238 10.2487 13.125 10 13.125Z"
                                    fill="#CB1E1E"/>
                                <path d="M10.625 5H9.37502V11.25H10.625V5Z" fill="#CB1E1E"/>
                                <path
                                    d="M14.375 18.125H5.62502C5.51579 18.125 5.40846 18.0964 5.31373 18.042C5.21901 17.9876 5.14019 17.9093 5.08515 17.8149L0.710149 10.3149C0.654384 10.2193 0.625 10.1107 0.625 10C0.625 9.88933 0.654384 9.78065 0.710149 9.68506L5.08515 2.18506C5.14019 2.09071 5.21901 2.01243 5.31373 1.95802C5.40846 1.90362 5.51579 1.875 5.62502 1.875H14.375C14.4843 1.875 14.5916 1.90362 14.6863 1.95802C14.781 2.01243 14.8599 2.09071 14.9149 2.18506L19.2899 9.68506C19.3457 9.78065 19.375 9.88933 19.375 10C19.375 10.1107 19.3457 10.2193 19.2899 10.3149L14.9149 17.8149C14.8599 17.9093 14.781 17.9876 14.6863 18.042C14.5916 18.0964 14.4843 18.125 14.375 18.125ZM5.9839 16.875H14.0161L18.0265 10L14.0161 3.125H5.9839L1.97359 10L5.9839 16.875Z"
                                    fill="#CB1E1E"/>
                            </svg>
                            {errors.phone}
                        </p>
                    )}
                </div>


                <div className="flex justify-center">
                    <button type="submit" id="registerSubmitBtn">Sign Up</button>
                </div>


            </form>
            {/*{successMessage}*/}
        </div>
    )
        ;
};

export default Register;