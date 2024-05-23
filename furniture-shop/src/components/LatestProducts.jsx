import React, {useEffect, useState} from 'react';
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import {SlMagnifierAdd} from "react-icons/sl";
import tabsNames from "../data/data.js"
import LatestProduct from "./LatestProduct.jsx";
import FeaturedProduct from "./FeaturedProduct.jsx";

const LatestProducts = (tabName) => {


    /******************GET PRODUCTS FROM DATABASE***********************/
    let furnitureProducts;

    const [furnitureData, setFurnitureData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products',)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setFurnitureData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    furnitureProducts = furnitureData.map((item, index) => {

        if (item.tags.includes("latest") && item.tags.includes(tabName.mark)) {

            let latest;
            let trending;
            let featured;
            let specialOffer;
            let newArrival;
            let bestSeller;

            latest = !!item.tags.includes("latest");
            trending = !!item.tags.includes("trending");
            featured= !!item.tags.includes("featured");
            specialOffer = !!item.tags.includes("special-offer");
            newArrival = !!item.tags.includes("new-arrival");
            bestSeller = !!item.tags.includes("best-seller");

            return <LatestProduct
                key={index}
                id={item._id}
                image={item.image[0]}
                name={item.name}
                price={item.price}
                sale={item.sale}
                code={item.code}
                featured={featured}
                latest={latest}
                trending={trending}
                specialOffer ={specialOffer}
                newArrival = {newArrival}
                bestSeller = {bestSeller}
            />
        }
    })



        return (
        <div className="flex flex-wrap justify-center items-center">
            {furnitureProducts}
        </div>
        );

};

export default LatestProducts;