import React from 'react';
import LoginUser from "../components/Login"
// import sticker1 from "../../public/images/decor-furniture-logo-1.png";
// import sticker2 from "../../public/images/decor-furniture-logo-2.png";
// import sticker3 from "../../public/images/decor-furniture-logo-3.png";
// import sticker4 from "../../public/images/decor-furniture-logo-4.png";
// import sticker5 from "../../public/images/decor-furniture-logo-5.png";
import sticker from "../../public/images/image 1174.svg";
import BreadCrumb from "../components/BreadCrumb.jsx";

const Login = () => {
    return (
        <section className="loginUserSection">
            <section className="heroSectionLogin pageSection">
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

            <div className="centerContainer userFormWrapper">
                <LoginUser/>
            </div>
            <div className="centerContainer flex justify-center">
                <img className="object-cover mb-[50px]" src={sticker}/>
            </div>

        </section>
    );
};

export default Login;