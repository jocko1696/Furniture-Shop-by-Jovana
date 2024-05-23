import RegisterUser from "../components/Register"
import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";

const RegisterNewUser = () => {
    return (
        <section className="registerUserSection">
            <section className="heroSectionRegister pageSection">
                <div className="overlay-wrapper">
                    <div className="centerContainer">
                        <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                            <h1 className="pageHeaderTitle">Login</h1>
                            <BreadCrumb/>
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
            </section>
            <div>
                <RegisterUser/>
            </div>
        </section>
    );
};

export default RegisterNewUser;