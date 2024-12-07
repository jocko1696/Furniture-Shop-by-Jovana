import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.name) {
            tempErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.message) {
            tempErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('http://localhost:5000/writeContact', formData);
                toast.success('Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } catch (error) {
                toast.error('An error occurred while sending the message.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="loginUserForm contactMessageForm">
                <div className="grid grid-cols-1 gap-10">
                    <div className="grid grid-cols-2 gap-[8px]">
                        <div>
                            <input
                                placeholder="Name & surname"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full"
                            />
                            {errors.name && (
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
                                    {errors.name}
                                </p>
                            )}
                            {/*{errors.name && <p>{errors.name}</p>}*/}
                        </div>
                       <div>
                           <input
                               placeholder="Email"
                               type="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
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
                           {/*{errors.email && <p>{errors.email}</p>}*/}
                       </div>

                    </div>
                    <div>
                         <textarea
                             placeholder="Message"
                             name="message"
                             value={formData.message}
                             onChange={handleChange}
                             rows="5"
                             className="w-full"
                         ></textarea>
                        {errors.message && (
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
                                {errors.message}
                            </p>
                        )}
                        {/*{errors.message && <p>{errors.message}</p>}*/}
                    </div>


                    <button type="submit" className="contactUs noRound py-[17px]">
                        Send
                    </button>
                </div>
            </form>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ContactUs;
