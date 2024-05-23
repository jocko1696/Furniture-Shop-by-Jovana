import React, {useEffect, useState} from 'react';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import {ReactComponent as SaleSticker} from "../../public/images/sale-sticker.svg"


const LatestProduct = (props) => {
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
                    <a className="flex justify-center items-center"><AiOutlineShoppingCart
                        className="svg-image"/></a>
                    <a className="flex justify-center items-center"><AiOutlineHeart className="svg-image"/></a>
                    <a className="flex justify-center items-center"><SlMagnifierAdd className="svg-image"/></a>
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