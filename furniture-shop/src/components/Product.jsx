import React from 'react';
import {useLocation} from 'react-router-dom';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import {NavLink} from 'react-router-dom'


const Product = (props) => {

    const location = useLocation();
    const isProductPage = location.pathname === '/products';


    return (
        <div className={`product flex py-[30px]  justify-center`}>
            <div className={`product card-box flex py-[30px] px-[30px] ${isProductPage ? "flex-row" : ""} shadow-box  `}>
                <div className="image-container" >
                    <NavLink to={`/products/:${props.id}`}><img src={props.image[0]} className="product-image responsive-image " alt="missing picture"/></NavLink>
                </div>
                <div className="px-[40px] flex flex-col justify-center max-w-[970px]">
                    <div className="flex flex-row">
                        <NavLink to={`/products/:${props.id}`}><h1 className="product-name py-4">{props.name}</h1></NavLink>
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
                        <span className="product-price mr-4 ">${props.price}</span>
                        <span className="product-sale">${props.sale}</span>
                    </div>
                    <div>
                        <p className="product-description max-w-[700px] text-justify">{props.description}</p>
                    </div>
                    <div className="py-[20px] svg-images-container">
                        <div className="flex flex-row py-2 svg-images">
                            <NavLink to="/cart" className="px-3 flex justify-center items-center"><AiOutlineShoppingCart className="svg-image"/></NavLink>
                            <NavLink to="/wishlist" className="px-3 flex justify-center items-center"><AiOutlineHeart className="svg-image"/></NavLink>
                            <a className="px-3 flex justify-center items-center"><SlMagnifierAdd className="svg-image"/></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
};

export default Product;