import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import CartSection from "../components/Cart.jsx";
import ShippingForm from "../components/ShippingForm.jsx";


const OrderCompleted = () => {
    return (
        <section className="heroSectionProducts pageSection ">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Cart</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <div className="max-w-[900px] mx-auto py-[100px] border-2 border-dotted border-custom-gray my-[100px]">
                <div className="relative centerContainer">
                    <div className="flex justify-center">
                        <img src="../../public/images/Vector 15.svg" alt=".."/>
                    </div>
                    <h2 className="sectionHeadingText text-center">Your Order Is Completed! </h2>
                    <p className="max-w-[700px] mx-auto order-completed-desc text-center ">Thank you for your order! Your order is being processed and will be completed within 3-6
                        hours. You will receive an email confirmation when your order is completed.
                    </p>

                    <img className="absolute checklistImg" src="../../public/images/checklist 1.svg" alt=".." />
                    <img className="absolute clockImg" src="../../public/images/clock 1.svg" alt=".."/>
                </div>
            </div>
        </section>
    );
};

export default OrderCompleted;