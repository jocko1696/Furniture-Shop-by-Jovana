import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import axios from "axios";
import ProductDetail from "../components/ProductDetail.jsx";
import CartSection from "../components/Cart";
import ShippingForm from "../components/ShippingForm";

const Cart = () => {
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
                <CartSection  />
            </div>
        </section>
    );
};

export default Cart;