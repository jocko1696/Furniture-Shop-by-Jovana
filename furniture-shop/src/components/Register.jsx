import React, {useContext, useState} from 'react';
import axios from 'axios';
import validate from 'validate.js';
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/useAuthContext";


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

        const validationErrors = validate(formData, constraints);
        setErrors(validationErrors || {});

        if (!validationErrors) {
            try {

                const response = await axios.post('http://localhost:5000/register', formData, {
                    withCredentials: true,
                    credentials: 'include'
                }).then(function (response) {
                    localStorage.setItem('token', response.data.data.token);
                    // console.log(response.data.data.token);
                    // setToken(response.data.data.token);
                    login(response.data.data.token);
                    setSuccessMessage(<p className="success-message">{response.data.message}</p>);
                    navigate("/");
                })
                    .catch(function (error) {
                        console.log(error);
                        setSuccessMessage(<p className="error-message">{error.response.data.message}</p>);
                    });

                console.log(token);

            } catch (error) {
                console.error(error);
                setSuccessMessage(<p className="error-message">{error.response.data.message}</p>);
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
                <div>
                    <input
                        type="email"
                        placeholder="E-Mail"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        className="w-full"

                    />
                    {errors.email && <span className="error-red">{errors.email[0]}</span>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        className="w-full"
                    />
                    {errors.password && <span className="error-red">{errors.password[0]}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        placeholder="First name"
                        onChange={handleChange}
                        name="firstName"
                        value={formData.firstName}
                        className="w-full"
                    />
                    {errors.firstName && <span className="error-red">{errors.firstName[0]}</span>}
                    {/*</div>*/}
                    {/*<div>*/}
                    <input
                        type="text"
                        placeholder="Last name"
                        onChange={handleChange}
                        name="lastName"
                        value={formData.lastName}
                        className="w-full"
                    />
                    {errors.lastName && <span className="error-red">{errors.lastName[0]}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        placeholder="City"
                        onChange={handleChange}
                        name="city"
                        value={formData.city}
                        className="w-full"
                    />
                    {errors.city && <span className="error-red">{errors.city[0]}</span>}
                    {/*</div>*/}
                    {/*<div>*/}
                    <input
                        type="text"
                        placeholder="Street"
                        onChange={handleChange}
                        name="street"
                        value={formData.street}
                        className="w-full"
                    />
                    {errors.street && <span className="error-red">{errors.street[0]}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        placeholder="Street number"
                        onChange={handleChange}
                        name="streetNumber"
                        value={formData.streetNumber}
                        className="w-full"
                    />
                    {errors.streetNumber && <span className="error-red">{errors.streetNumber[0]}</span>}
                    {/*</div>*/}
                    {/*<div>*/}
                    <input
                        type="text"
                        placeholder="Postal code"
                        onChange={handleChange}
                        name="postalCode"
                        value={formData.postalCode}
                        className="w-full"
                    />
                    {errors.postalCode && <span className="error-red">{errors.postalCode[0]}</span>}
                </div>
                <div>
                    <PhoneInput
                        defaultCountry="ua"
                        name="phone"
                        value={formData.phone}
                        onChange={(phone) => setFormData({...formData, phone})}
                        className="w-full"

                    />
                    {errors.phone && <span className="error-red">{errors.phone[0]}</span>}
                </div>


                <div className="flex justify-center">
                    <button type="submit" id="registerSubmitBtn">Sign Up</button>
                </div>


            </form>
            {/*{message && <p className="message">{message}</p>}*/}
            {successMessage}
        </div>
    )
        ;
};

export default Register;