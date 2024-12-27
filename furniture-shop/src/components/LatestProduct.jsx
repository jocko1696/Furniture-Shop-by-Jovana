import React, {useEffect, useState} from 'react';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import {ReactComponent as SaleSticker} from "../../public/images/sale-sticker.svg"
import {NavLink} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";


const LatestProduct = (props) => {
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
    let sale;
    if(props.sale<props.price){
         sale = true;
    }

    return (
        <div className="lp flex flex-col w-[370px] h-[275px] mx-[20px] my-[40px] products-page-container ">

            <div className="card-top  relative">
                <img className="w-[370px] h-[275px] object-cover" alt="Error while loading image"
                     src={props.image}/>
                <div className="lp-buttons hidden" id="lp-buttons">
                    <a className="flex justify-center items-center" onClick={() => addToCart(props)}><AiOutlineShoppingCart
                        className="svg-image"/></a>
                    <NavLink className="flex justify-center items-center" to="/wishlist"><AiOutlineHeart className="svg-image"/></NavLink>
                    <NavLink className="flex justify-center items-center" to={`/products/:${props.id}`}><SlMagnifierAdd className="svg-image"/></NavLink>
                </div>
                {sale===true &&
                    <div className="absolute top-[10px] right-[10px]"><SaleSticker className="saleSticker" /></div>
                }


            </div>
            <div className="card-bottom flex justify-between">
                <p className="lp-name lp-cb-right" id="lp-name">{props.name}</p>
                <div className="lp-cb-right flex gap-6">
                    <p className="lp-price ">${props.price}</p>
                    <p className="lp-code" id="lp-sale"><b>${props.sale}</b></p>
                </div>

            </div>
        </div>
    );

};

export default LatestProduct;