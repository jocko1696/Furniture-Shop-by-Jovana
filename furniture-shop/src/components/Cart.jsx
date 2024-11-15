import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TiDelete} from "react-icons/ti";
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:5000');  // Replace with your server URL


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getAllProductsFromCart');
            setCartItems(response.data);
            updateTotalPrice(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const updateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    useEffect(() => {

        fetchCartItems();

        // socket.on('cartUpdated', (data) => {
        //     // Update total price when cart is updated
        //     setTotalPrice(data.totalPrice);
        //     fetchCartItems();  // Optionally refresh the cart items
        // });
        //
        // return () => {
        //     socket.off('cartUpdated');
        // };
    }, []);

    // Function to calculate the total price of the entire cart
    const calculateTotalPrice = () => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    // Recalculate the total whenever cartItems change
    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const removeItem = async (id) => {
        await axios.delete(`http://localhost:5000/deleteProductFromCart/${id}`);
        setCartItems(cartItems.filter(item => item._id !== id));
    };

    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };
    return (

        <div className="cart-container">

            <div className="cart-table max-w-[70%]">
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={item._id} className={`row-${index + 1}`}>
                            <td className="cart-image-row">
                                <img src={item.image} alt="Product Image" className="cart-product-image"/>
                                <button onClick={() => removeItem(item._id)}><TiDelete className="delete-from-cart"/>
                                </button>
                            </td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${calculateTotal(item.price, item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <button
                        className=" clearCart flex items-center text-white text-xl  max-w-[163px] pl-[40px] pr-[40px] pt-[11px] pb-[11px] ">Clear
                        Cart
                    </button>
                </div>
            </div>

            <div className="cart-summary max-w-[30%]">
                <h2 className="text-center cart-totals-heading">Cart Totals</h2>
                <div className="summary-row flex flex-col ">
                    <div className="flex justify-between py-4">
                        <span className="py-4">Totals:</span>
                        <span className="py-4">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="proceed-button py-4">Proceed to Checkout</button>
                </div>


            </div>


        </div>

    );
};

export default Cart;