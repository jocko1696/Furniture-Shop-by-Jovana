import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import client1 from "../../public/images/client-1.png";
import client2 from "../../public/images/client-2.png";
import client3 from "../../public/images/client-3.png";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "../assets/styles/swipers.css";

const ReviewsPagination = () => {
    const [commentSlide, setCommentSlide] = useState(1);
    document.title = "Hekto - About Us";
    const clientDetails = [
        {
            name: "Sam Bankman-Fried",
            position: "Ceo At FTX",
            description:`I absolutely love shopping at Furniture Shop Hekto! 
            The quality of their products is outstanding, and every piece I’ve purchased has transformed my home into a cozy and stylish space. 
            Their customer service is top-notch, always going the extra mile to ensure satisfaction. Highly recommended!`,
        },
        {
            name: "Selina Gomez",
            position: "Ceo At Webecy Digital",
            description:`Furniture Shop Hekto is a gem! 
            The variety of designs and the attention to detail in their furniture are impressive. The staff is incredibly helpful, and the delivery process was seamless. 
            I couldn’t be happier with my new dining set—it’s both beautiful and functional!`,
        },
        {
            name: "Guy Gershon",
            position: "Senior Technical Product Manager",
            description:`My experience with Furniture Shop Hekto has been nothing short of amazing. 
            From the moment I stepped into their showroom, I was greeted with warmth and professionalism. 
            The craftsmanship and durability of their furniture are unmatched. I’ll definitely be a returning customer!`,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: "100%",
                transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
            <div className="container mx-auto">
                <div>
                    <h3 className="text-center font-bold font-JosefinSans text-[42px] mb-14">
                        Our Client Say!
                    </h3>
                    <div className="flex items-center justify-center w-full mb-7 r">
                        <img
                            src={client1}
                            className={`w-[55px] h-[55px] duration-150 ease-in-out ${
                                commentSlide === 0 && "-mt-5"
                            }`}
                            alt="Sam Bankman-Fried"
                        />
                        <img
                            src={client2}
                            className={`w-[55px] h-[55px] duration-150 ease-in-out mx-7 ${
                                commentSlide === 1 && "-mt-5"
                            }`}
                            alt="Selina Gomez"
                        />
                        <img
                            src={client3}
                            className={`w-[55px] h-[55px] duration-150 ease-in-out ${
                                commentSlide === 2 && "-mt-5"
                            }`}
                            alt="Guy Gershon"
                        />
                    </div>
                    <Swiper
                        modules={[Pagination]}
                        initialSlide={commentSlide}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        onRealIndexChange={(element) =>
                            setCommentSlide(element.activeIndex)
                        }
                        pagination={{ clickable: true }}
                        className="mySwiper about-us"
                    >
                        {clientDetails.map((client) => (
                            <SwiperSlide
                                className="flex flex-col items-center text-center"
                                key={client.name}
                            >
                                <h4 className="font-Lato text-2xl font-semibold text-black mb-1">
                                    {client.name}
                                </h4>
                                <h5 className="text-[#8A8FB9] font-Lato text-[14px] mb-5">
                                    {client.position}
                                </h5>
                                <p className="text-[#8A8FB9] font-base font-bold text-base font-Lato leading-6">
                                    {client.description}
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewsPagination;
