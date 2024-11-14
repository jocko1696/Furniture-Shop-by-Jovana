import React, {useEffect, useState} from 'react';
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');  // Replace with your server URL




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
        // const fetchCartItems = async () => {
        //     const response = await axios.get('http://localhost:5000/getAllProductsFromCart');
        //     setCartItems(response.data);
        // };
        // fetchCartItems();
        //
        // // Fetch the initial total price
        // const fetchTotalPrice = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:5000/totalPrice');
        //         setTotalPrice(response.data.totalPrice);
        //     } catch (error) {
        //         console.error('Error fetching total price:', error);
        //     }
        // };
        // fetchTotalPrice();
        //
        // // Listen for cart update events
        // socket.on('cartUpdated', fetchTotalPrice);
        //
        // // Cleanup the socket listener on component unmount
        // return () => {
        //     socket.off('cartUpdated', fetchTotalPrice);
        // };

        fetchCartItems();

        socket.on('cartUpdated', (data) => {
            // Update total price when cart is updated
            setTotalPrice(data.totalPrice);
            fetchCartItems();  // Optionally refresh the cart items
        });

        return () => {
            socket.off('cartUpdated');
        };
    }, []);

    const removeItem = async (id) => {
        await axios.delete(`http://localhost:5000/deleteProductFromCart/${id}`);
        setCartItems(cartItems.filter(item => item._id !== id));
    };

    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };
    return (

            <div className="cart-container">

                <div className="cart-table">
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
                        {cartItems.map(item => (
                            <tr key={item._id}>
                                <td className="cart-image-row">
                                    <img src={item.image} alt="Product Image" className="cart-product-image" />
                                    <button onClick={() => removeItem(item._id)}><TiDelete className="delete-from-cart" /></button>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${calculateTotal(item.price, item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>
                <button className="proceed-button">Proceed to Checkout</button>
            </div>


        </div>

    );
};

export default Cart;