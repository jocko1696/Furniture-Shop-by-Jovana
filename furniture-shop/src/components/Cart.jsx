import React, {useEffect, useState} from 'react';
import axios from "axios";
import { TiDelete } from "react-icons/ti";

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
                                {/*<button onClick={() => removeItem(item._id)}>Remove</button>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>$20.00</span>
                </div>
                <div className="summary-row">
                    <span>Total</span>
                    <span>$20.00</span>
                </div>
                <button className="proceed-button">Proceed to Checkout</button>
            </div>


        </div>

    );
};

export default Cart;