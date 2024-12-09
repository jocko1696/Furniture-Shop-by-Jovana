import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import ImageGallery from "./ImageGallery.jsx";
import {AiOutlineHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import axios from "axios";
import { toast } from 'react-toastify';  // Import toast for notifications

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({ title: 'React POST Request Example' })
        };
        // Fetch product details from API using the ID
        fetch(`http://localhost:5000/products/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/addProductToCart', {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image[0],
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Product added to cart successfully!');  // Success toast
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart. Please try again.');  // Error toast
        }
    };

    return (
        <div className="centerContainer ">
            <div className=" product-details-wrapper grid grid-cols-2 gap-[40px] md:flex md:flex-col">
                <div className="product-image-container "><ImageGallery images={product.image}/>
                </div>

                <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col space-y-4 max-h-[600px]">
                    {/* Product Name */}
                    <h1 className="product-name text-2xl font-semibold text-gray-800 hover:text-teal-500 transition duration-300">
                        {product.name}
                    </h1>

                    {/* Color Indicators (Squares) */}
                    <div className="fp-squares flex space-x-2">
                        <span className="square bg-teal-300 w-6 h-6 rounded-full"></span>
                        <span className="square bg-pink-500 w-6 h-6 rounded-full"></span>
                        <span className="square bg-yellow-100 w-6 h-6 rounded-full"></span>
                    </div>

                    {/* Price */}
                    <div className="price-section flex md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <span className="product-price text-lg font-bold text-gray-800">${product.price}</span>
                        {product.sale && (
                            <span className="product-sale text-sm text-red-500 line-through mt-[0px]">${product.sale}</span>
                        )}
                    </div>

                    {/* Product Description */}
                    <div className="product-description-wrapper">
                        <p className="product-description text-gray-600 text-sm">{product.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons flex md:flex-row items-center md:space-y-0 md:space-x-6">
                        <button
                            className="p-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 mr-[10px]"
                            onClick={() => addToCart(product)}
                        >
                            <AiOutlineShoppingCart className="w-5 h-5" />
                            <span className="text-sm sm:text-base">Add to Cart</span>
                        </button>
                        <NavLink
                            to="/wishlist"
                            className="p-2 bg-gray-100 text-gray-600 rounded-md shadow-md hover:bg-gray-200 flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <AiOutlineHeart className="w-5 h-5" />
                            <span className="text-sm sm:text-base">Wishlist</span>
                        </NavLink>
                        {/*<NavLink*/}
                        {/*    to={`/products/:${product.id}`}*/}
                        {/*    className="p-2 bg-gray-100 text-gray-600 rounded-md shadow-md hover:bg-gray-200 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"*/}
                        {/*>*/}
                        {/*    <SlMagnifierAdd className="w-5 h-5" />*/}
                        {/*    <span className="text-sm sm:text-base">View</span>*/}
                        {/*</NavLink>*/}
                    </div>
                </div>
            </div>
            {/* Back to Blogs Link */}
            <div className="mt-8 text-center mb-[100px]">
                <a href="/products" className="text-purple-600 hover:underline">
                    Back to Products
                </a>
            </div>
        </div>

    );
}

export default ProductDetail;
