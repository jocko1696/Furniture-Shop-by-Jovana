import React from 'react';

const EmailComponent = () => {
    return (
        <div className="emailContainer ">
            <form  id="email-form" method="POST">
                <div className="form-group flex items-center">
                   <input type="email"placeholder="Enter Email Address" />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>

            </form>
        </div>
    );
};

export default EmailComponent;