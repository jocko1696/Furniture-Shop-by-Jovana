import React from 'react';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import {Link, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

const FeaturedProduct = (props) => {
    /************** ADD PRODUCTS TO CART ****************************/

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/addProductToCart', {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
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

    if (props.featured === true) {

        return (
            <div className="fp flex flex-col ">
                <div className="card-top max-h-[350px] relative">
                    <img className="w-[325px] h-[325px] object-cover rounded-t-[15px]" alt="Error while loading image"
                         src={props.image}/>
                    <div className="fb-buttons hidden" id="fp-buttons">
                        <a className="flex justify-center items-center"  onClick={() => addToCart(props)} ><AiOutlineShoppingCart
                            className="svg-image"/></a>
                        <NavLink className="flex justify-center items-center" to="/wishlist"><AiOutlineHeart className="svg-image"/></NavLink>
                        <NavLink className="flex justify-center items-center" to={`/products/:${props.id}`}><SlMagnifierAdd className="svg-image"/></NavLink>
                    </div>
                    <div className="fp-view-details hidden" id="fp-view-details">
                        <Link className="bg-green-500 px-[30px] py-[20px] text-white family-['Popins']" to={`/products/:${props.id}`}>View
                            details</Link>
                    </div>
                </div>
                <div className="card-bottom flex flex-col items-center justify-center">
                    <p className="fp-name" id="fp-name">{props.name}</p>
                    <div className="fp-squares flex">
                        <span
                            className="square blue-square px-[10px] py-[3px] bg-teal-300 mx-[4px] rounded-[5px]"></span>
                        <span
                            className="square pink-square px-[10px] py-[3px] bg-pink-500  mx-[4px] rounded-[5px]"></span>
                        <span
                            className="square yellow-square px-[10px] py-[3px] bg-yellow-100  mx-[4px] rounded-[5px]"></span>
                    </div>
                    <p className="fp-code">Code · {props.code}</p>
                    <p className="fp-price">${props.price}</p>
                </div>
            </div>
        );
    }
};

export default FeaturedProduct;