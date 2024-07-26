import React, {useState} from 'react';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

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
                const response = await axios.post('http://localhost:5000/writeContact', formData);
                setSuccess('Your message has been sent successfully!');
                setFormData({name: '', email: '', message: ''});
            } catch (error) {
                setErrors({form: 'An error occurred while sending the message'});
            }
        }
    };

    return (
        <div className="flex items-center justify-center max-w-[500px] mx-auto">
            <form onSubmit={handleSubmit} className="loginUserForm w-full">
                <h3 className="text-center sectionHeadingText">Contact Us</h3>
                <div className="flex justify-center flex-col loginUserFormInput">
                    <div>
                        <input placeholder="Name & surname" type="text" name="name" value={formData.name}
                               onChange={handleChange}
                               className="w-full"
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <input placeholder="Email" type="email" name="email" value={formData.email}
                               onChange={handleChange}
                               className="w-full"
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div>
                        <textarea placeholder="Message" name="message" value={formData.message}
                                  onChange={handleChange}
                                  className="w-full"
                        ></textarea>
                        {errors.message && <p>{errors.message}</p>}
                    </div>
                    <button type="submit">Send</button>
                    {errors.form && <p>{errors.form}</p>}
                    {success && <p>{success}</p>}
                </div>

            </form>
        </div>
    );
};

export default ContactUs;
