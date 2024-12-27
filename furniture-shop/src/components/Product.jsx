import React from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { SlMagnifierAdd } from "react-icons/sl";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const Product = (props) => {

    const location = useLocation();
    const isProductPage = location.pathname === '/products';

    /************** ADD PRODUCTS TO CART ****************************/

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/addProductToCart', {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image[0],
            });

            if (response.status === 201 || response.status === 200) {
                console.log('Product added to cart successfully:', response.data);
                toast.success("Product added to cart!", ); // Success toast
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error("Error adding product to cart. Please try again.", ); // Error toast
        }
    };

    return (
        <>
            <div className={`product flex py-8 justify-center`}>
                <div className={`product card-box flex flex-col lg:flex-row p-6 shadow-lg rounded-lg bg-white max-w-4xl`}>
                    {/* Image Section */}
                    <div className="image-container flex-shrink-0 w-full lg:w-1/3">
                        <NavLink to={`/products/:${props.id}`}>
                            <img
                                src={props.image[0]}
                                className="product-image object-cover rounded-md w-full h-64 lg:h-auto"
                                alt="Product"
                            />
                        </NavLink>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 flex flex-col justify-between lg:w-2/3">
                        {/* Name and Squares */}
                        <div className="flex justify-between items-center">
                            <NavLink to={`/products/${props.id}`}>
                                <h1 className="product-name text-xl font-semibold text-gray-800 truncate py-2 hover:text-teal-500">
                                    {props.name}
                                </h1>
                            </NavLink>
                            <div className="fp-squares flex">
                                <span className="square blue-square w-4 h-4 bg-teal-300 mx-1 rounded-full"></span>
                                <span className="square pink-square w-4 h-4 bg-pink-500 mx-1 rounded-full"></span>
                                <span className="square yellow-square w-4 h-4 bg-yellow-100 mx-1 rounded-full"></span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center py-2">
                            <span className="product-price text-lg font-bold text-gray-800 mr-2">
                                ${props.price}
                            </span>
                            {props.sale && (
                                <span className="product-sale text-sm line-through text-gray-500">
                                    ${props.sale}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <p
                                className="product-description text-gray-600 text-sm line-clamp-3"
                                title={props.description}
                            >
                                {props.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="py-4 flex space-x-4">
                            <button
                                className="p-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => addToCart(props)}
                            >
                                <AiOutlineShoppingCart className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Add to Cart</span>
                            </button>
                            <NavLink
                                to="/wishlist"
                                className="p-2 bg-gray-100 text-gray-600 rounded-md shadow-md hover:bg-gray-200 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <AiOutlineHeart className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Wishlist</span>
                            </NavLink>
                            <NavLink
                                to={`/products/:${props.id}`}
                                className="p-2 bg-gray-100 text-gray-600 rounded-md shadow-md hover:bg-gray-200 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <SlMagnifierAdd className="w-5 h-5" />
                                <span className="text-sm sm:text-base">View</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
