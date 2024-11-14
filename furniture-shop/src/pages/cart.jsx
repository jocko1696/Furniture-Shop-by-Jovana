import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import axios from "axios";
import ProductDetail from "../components/ProductDetail.jsx";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await axios.get('http://localhost:5000/getAllProductsFromCart');
            setCartItems(response.data);
        };
        fetchCartItems();
    }, []);

    const removeItem = async (id) => {
        await axios.delete(`http://localhost:5000/deleteProductFromCart/${id}`);
        setCartItems(cartItems.filter(item => item._id !== id));
    };
    return (
        <section className="heroSectionProducts pageSection ">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Products</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <div>
                <h1>Your Cart</h1>
                {cartItems.map(item => (
                    <div key={item._id}>
                        <p>{item.name} - ${item.price} x {item.quantity}</p>
                        <button onClick={() => removeItem(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Cart;