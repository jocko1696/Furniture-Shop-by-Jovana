import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import ImageGallery from "./ImageGallery.jsx";
import {AiOutlineHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";

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

    return (
        <div className="centerContainer product-details-wrapper grid grid-cols-2 gap-[40px] md:flex md:flex-col">
            <div className="product-image-container "><ImageGallery images={product.image}/>
            </div>
            <div className="product-info product">
                <div className="flex flex-col justify-center max-w-[970px]">
                    <div className="flex flex-row">
                        <h1 className="product-name py-4">{product.name}</h1>

                        <div className="fp-squares product-page-squares flex h-[2px] py-5 mx-[30px]">
                        <span
                            className="square blue-square px-[10px] py-[10px] bg-teal-300 mx-[4px] rounded-full"></span>
                            <span
                                className="square pink-square px-[10px] py-[10px] bg-pink-500  mx-[4px] rounded-full"></span>
                            <span
                                className="square yellow-square px-[10px] py-[10px] bg-yellow-100  mx-[4px] rounded-full"></span>
                        </div>
                    </div>

                    <div className="flex flex-row py-1">
                        <span className="product-price mr-4 ">${product.price}</span>
                        <span className="product-sale">${product.sale}</span>
                    </div>
                    <div className="product-description-wrapper">
                        <p className="product-description max-w-[700px]">{product.description}</p>
                    </div>
                </div>
                <div className="flex svg-images-container">
                    <NavLink to="/cart" className="flex justify-center items-center add-to-cart mr-[20px]">Add To Cart</NavLink>
                    <div className="py-[15px]">
                        <div className="flex flex-row py-2 svg-images">
                           <NavLink to="/cart" className="flex justify-center items-center" ><AiOutlineShoppingCart className="svg-image"/></NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetail;
