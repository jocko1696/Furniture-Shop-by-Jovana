import React, {useEffect, useState} from 'react';
import validator from 'validator';
import ActionButton from "../components/ActionButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ShippingForm = ({cartItems}) => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        country: '',
        postalCode: '',
        paymentMethod: "cod",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // For redirecting to success page


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validate = () => {
        let formErrors = {};
        // Contact Info validation
        if (!validator.isEmail(formData.email)) {
            formErrors.email = 'Invalid email address';
        }
        // if (!validator.isMobilePhone(formData.phone, 'any', { strictMode: true })) {
        //     formErrors.phone = 'Invalid phone number';
        // }
        if (!validator.isMobilePhone(formData.phone, 'any')) {
            formErrors.phone = 'Invalid phone number';
        }
        // Shipping Info validation
        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';
        if (!formData.address) formErrors.address = 'Address is required';
        if (!formData.city) formErrors.city = 'City is required';
        if (!formData.country) formErrors.country = 'Country is required';
        if (!formData.paymentMethod)
            errors.paymentMethod = "Please select a payment method";
        if (!formData.postalCode || !validator.isPostalCode(formData.postalCode, 'any')) {
            formErrors.postalCode = 'Invalid postal code';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form before submitting
        if (!validate()) {
            setIsSubmitting(false);
            return;
        }

        const orderData = {
            items: cartItems, // Cart items array
            clientDetails: { ...formData } // Everything else in formData
        };

        try {

            if (formData.paymentMethod === "stripe") {

                console.log("Sending order data to Stripe:", orderData);

                // Make an axios POST request
                const response = await axios.post(
                    "http://localhost:5000/create-checkout-session",
                    orderData,
                    {
                        headers: {
                            "Content-Type": "application/json", // Required for JSON payload
                        },
                    }
                );

                // Check the response
                console.log("Stripe session created successfully:", response.data);

                // Redirect to the Stripe checkout page
                window.location.href = response.data.url;

            } else if (formData.paymentMethod === "cod") {
                // Create the order for COD
                const response = await axios.post(
                    "http://localhost:5000/create-order",
                    orderData,
                    { headers: { "Content-Type": "application/json" } }
                );

                console.log("Order created successfully:", response.data);

                // Navigate to success page
                navigate("/order-completed");
            }
        } catch (error) {
            // Handle errors during the request
            if (error.response) {
                // The request was made, and the server responded with an error
                console.error("Backend responded with an error:", error.response.data);
                alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("No response received from the backend:", error.request);
                alert("Error: Unable to reach the server. Please try again later.");
            } else {
                // Something happened in setting up the request
                console.error("Error setting up the request:", error.message);
                alert("Error: Something went wrong. Please try again.");
            }
        } finally {
            // Reset submitting state
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shippingForm w-full" id="shoppingForm">
            <div className="contact-info">
                <h2>Contact Information</h2>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full"
                    />
                    {errors.email && (
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
                            {errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
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
            </div>

            <div className="shipping-info">
                <h2>Shipping Information</h2>
                <div className="flex flex-row flex-md-col justify-between">
                    <div className="w-6/12 mr-5">

                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full"
                        />
                        {errors.firstName && (
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
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div className="w-6/12">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full"
                        />
                        {errors.lastName && (
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
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full"
                    />
                    {errors.address && (
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
                            {errors.address}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Apartment"
                        className="w-full"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full"
                    />
                    {errors.city && (
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
                            {errors.city}
                        </p>
                    )}
                </div>
                <div className="flex flex-row flex-md-col">
                    <div className="w-6/12 mr-5">
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full"
                        />
                        {errors.country && (
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
                                {errors.country}
                            </p>
                        )}
                    </div>
                    <div className="w-6/12">
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Postal Code"
                            className="w-full"
                        />
                        {errors.postalCode && (
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
                                {errors.postalCode}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="payment-type-info">
                <h2>Payment method</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleChange}
                        />
                        Cash on Delivery
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe"
                            checked={formData.paymentMethod === "stripe"}
                            onChange={handleChange}
                        />
                        Pay with Stripe
                    </label>
                    {errors.paymentMethod && (
                        <p style={{color: "red"}}>{errors.paymentMethod}</p>
                    )}
                </div>
            </div>

            <ActionButton handleSubmit={handleSubmit} paymentMethod={formData.paymentMethod}/>
        </form>
    );
};

export default ShippingForm;