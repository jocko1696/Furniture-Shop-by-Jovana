import React, {useState, useEffect} from 'react';
import FeaturedProduct from "./FeaturedProduct.jsx";
import Carousel from 'react-multi-carousel';
import CustomDot from "./CustomDot.jsx";
import 'react-multi-carousel/lib/styles.css';
import {responsive} from "../data/responsive";
import axios from 'axios';

const ProductCarousel = () => {


    /******************GET PRODUCTS FROM DATABASE***********************/
    let furnitureProducts;

    const [furnitureData, setFurnitureData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products',)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setFurnitureData(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    furnitureProducts = furnitureData.map((item, index) => {


            if (item.tags.includes("featured")) {

                let latest;
                let trending;
                let featured;
                let specialOffer;
                let newArrival;
                let bestSeller;

                latest = !!item.tags.includes("latest");
                trending = !!item.tags.includes("trending");
                featured = !!item.tags.includes("featured");
                specialOffer = !!item.tags.includes("special-offer");
                newArrival = !!item.tags.includes("new-arrival");
                bestSeller = !!item.tags.includes("best-seller");


                return <FeaturedProduct
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
                    specialOffer={specialOffer}
                    newArrival={newArrival}
                    bestSeller={bestSeller}

                />
            }


        }
    )


    return (
        <section className="sectionProducts pt-[100px] pb-[100px]">
            <h1 className="sectionHeadingText text-center">Featured Products</h1>
            {/*<div className="centerContainer productCarousel flex flex-wrap justify-center items-center">{furnitureProducts}</div>*/}
            <Carousel showDots={true}
                      responsive={responsive}
                      infinite={true}
                // autoPlay={true}
                      autoPlaySpeed={3000}
                // keyBoardControl={true}
                      customTransition="all .5"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["superLargeDesktop", "desktop", "tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      swipeable={true}
                      draggable={false}
                      renderDotsOutside={false}
                      customDot={<CustomDot/>}
                // additionalTransfrom={0}
            >
                {furnitureProducts}
            </Carousel>
        </section>

    );
};

export default ProductCarousel;