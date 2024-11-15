import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import axios from "axios";
import ProductDetail from "../components/ProductDetail.jsx";
import CartSection from "../components/Cart";
import ShippingForm from "../components/ShippingForm";

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    //
    // useEffect(() => {
    //     const fetchCartItems = async () => {
    //         const response = await axios.get('http://localhost:5000/getAllProductsFromCart');
    //         setCartItems(response.data);
    //     };
    //     fetchCartItems();
    // }, []);

    // const removeItem = async (id) => {
    //     await axios.delete(`http://localhost:5000/deleteProductFromCart/${id}`);
    //     setCartItems(cartItems.filter(item => item._id !== id));
    // };
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
            <div className="max-w-[1260px] mx-auto">
                <CartSection />
            </div>
            <div className="centerContainer flex justify-center ">
                <ShippingForm />
            </div>
        </section>
    );
};

export default Cart;