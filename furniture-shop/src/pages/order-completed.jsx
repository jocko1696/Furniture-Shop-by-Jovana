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
            <div className="max-w-[1260px] mx-auto py-[100px]">
              <div className="relative">
                  <img src="../assets/Vector 15.svg"  alt=".."/>
                  <h2>Your Order Is Completed! </h2>
                  <p>Thank you for your order! Your order is being processed and will be completed within 3-6
                      hours. You will receive an email confirmation when your order is completed.
                  </p>

                  <img className="absolute" src="../assets/checklist 1.svg"  alt=".."/>
                  <img className="absolute" src="../assets/clock 1.svg"  alt=".."/>
              </div>
            </div>
        </section>
    );
};

export default OrderCompleted;