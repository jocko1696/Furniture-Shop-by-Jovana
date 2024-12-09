import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Assuming you use react-router
import axios from "axios";
import { TiDelete } from "react-icons/ti";
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:5000');  // Replace with your server URL
import ShippingForm from "../components/ShippingForm";
import { toast } from 'react-toastify'; // Importing toast for notifications

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

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
        try {
            const response = await axios.delete(`http://localhost:5000/deleteProductFromCart/${id}`);
            if (response.status === 200) {
                setCartItems(cartItems.filter(item => item._id !== id));
                toast.success('Product removed from the cart successfully!'); // Success toast
            } else {
                toast.error('Failed to remove the product. Please try again.'); // Error toast
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error('Failed to remove the product. Please try again.'); // Error toast
        }
    };

    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };

    return (
        <div className="centerContainer">
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
                                    <img src={item.image} alt="Product Image" className="cart-product-image" />
                                    <button onClick={() => removeItem(item._id)}>
                                        <TiDelete className="delete-from-cart" />
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
                        <button className="clearCart flex items-center text-white text-xl max-w-[163px] pl-[40px] pr-[40px] pt-[11px] pb-[11px]">
                            Clear Cart
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
                        <a href="#shoppingForm" className="proceed-button py-4">Proceed to Checkout</a>
                    </div>
                </div>
            </div>
            <div className="shippingContainer flex justify-center">
                <ShippingForm cartItems={cartItems} />
            </div>
        </div>
    );
};

export default Cart;
