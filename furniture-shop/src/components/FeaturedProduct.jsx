import React from 'react';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import {Link} from "react-router-dom";

const FeaturedProduct = (props) => {


    if (props.featured === true) {
        return (
            <div className="fp flex flex-col ">
                <div className="card-top max-h-[350px] relative">
                    <img className="w-[325px] h-[325px] object-cover rounded-t-[15px]" alt="Error while loading image"
                         src={props.image}/>
                    <div className="fb-buttons hidden" id="fp-buttons">
                        <a className="flex justify-center items-center"><AiOutlineShoppingCart
                            className="svg-image"/></a>
                        <a className="flex justify-center items-center"><AiOutlineHeart className="svg-image"/></a>
                        <a className="flex justify-center items-center"><SlMagnifierAdd className="svg-image"/></a>
                    </div>
                    <div className="fp-view-details hidden" id="fp-view-details">
                        <Link className="bg-green-500 px-[30px] py-[20px] text-white family-['Popins']" to={`/products/${props.id}`}>View
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