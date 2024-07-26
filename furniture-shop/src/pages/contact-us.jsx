import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import Blog from "../components/Blog";
import CardSection from "../components/CardSection.jsx";
import FeaturedProduct from "../components/FeaturedProduct.jsx";
import Reviews from "../components/Reviews.jsx";

const Contact = () => {

    // const [reviews, setReviews] = useState([]);
    //
    // /******************GET REVIEWS FROM DATABASE***********************/
    // let allReviews ;
    // useEffect(() => {
    //     fetch('http://localhost:5000/getReviews',)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // console.log(data);
    //             setReviews(data);
    //              console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

    // allReviews = reviews.map((item, index) => {
    //
    //             return <FeaturedProduct
    //                 key={index}
    //                 id={item._id}
    //                 image={item.image[0]}
    //                 name={item.name}
    //                 price={item.price}
    //                 sale={item.sale}
    //                 code={item.code}
    //                 featured={featured}
    //                 latest={latest}
    //                 trending={trending}
    //                 specialOffer={specialOffer}
    //                 newArrival={newArrival}
    //                 bestSeller={bestSeller}
    //
    //             />
    //
    //     }
    // )

    return (
        <section className="heroSectionContact pageSection contact-page">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Contact Us</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <Blog/>
            <CardSection/>
            <div className="contact-section px-[70px] py-[20px]">
                <div className="centerContainer ">
                    <Reviews/>
                </div>
            </div>

        </section>
    );
};

export default Contact;