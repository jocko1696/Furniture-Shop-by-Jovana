import React from "react";
import { FaHeart, FaTelegram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import ContactUsIMG from "../../public/images/contact-us.png"; // Replace with the correct image path
import ContactUs from "../components/ContactUs";

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="contact-container centerContainer">
                <section className="contact-section flex gap-[30px] infoAboutUs">
                    <div className="w-1/2 half">
                        <h2 className="infoHeader sm:text-center">Information About Us</h2>
                        <p className="text-justify">
                            We are dedicated to providing exceptional products and services that cater to your needs and exceed expectations.
                            With a passion for quality and innovation, our team works tirelessly to deliver value and build lasting relationships.
                            At the heart of our mission is a commitment to customer satisfaction and a focus on making a positive impact.
                        </p>
                        <div className="icon-row">
                            <div className="icon purple"></div>
                            <div className="icon pink"></div>
                            <div className="icon blue"></div>
                        </div></div>
                    <div className="contact-section half w-1/2 gap-5">
                        <h2 className="infoHeader sm:text-center">Contact Way</h2>
                        <div className="grid grid-cols-1 gridContactWay lg:grid-cols-2 gap-14">
                            <div className="flex w-full justify-between sm:flex-col sm:justify-center sm:items-center sm:gap-[30px]">
                                <div className="contact-way w-1/2 sm:w-full">
                                    <div className="icon purple min-w-[45px] min-h-[45px]"></div>
                                    <div className="flex flex-col my-auto">
                                        <p className="flex">
                                            <HiMail className="mr-1.5" />{" "}
                                            <a href="mailto:hekto@gmail.com">
                                                hekto@gmail.com
                                            </a>
                                        </p>
                                        <p className="flex">
                                            <FaTelegram className="mr-1.5" />{" "}
                                            <a href="https://hekto" target="_blank" rel="noopener noreferrer">
                                                @wsxxsw
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="contact-way w-1/2 sm:w-full">
                                    <div className="icon pink min-w-[45px] min-h-[45px]"></div>
                                    <p>Support Forum For Over 24 Hours</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-between sm:flex-col sm:justify-center sm:items-center sm:gap-[30px]">
                                <div className="contact-way w-1/2 sm:w-full">
                                    <div className="icon yellow min-w-[45px] min-h-[45px]"></div>
                                    <p className="flex">
                                        On Your Heart <FaHeart style={{ color: "red" }} className="ml-1.5 mt-[3px]" />
                                    </p>
                                </div>
                                <div className="contact-way w-1/2 sm:w-full">
                                    <div className="icon green min-w-[45px] min-h-[45px]"></div>
                                    <p>Free Standard Shipping On All Orders</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="contact-section flex sm:flex-col">
                    <div className="w-1/2 sm:w-full">
                        <h2 className="infoHeader">Get In Touch</h2>
                        <p className="infoDesc text-justify">
                            Have questions or need assistance? Our team is here to help with expert guidance and personalized support.
                            Whether you’re looking for more information, have a specific request, or just want to say hello, we’d love to hear from you.
                            Reach out to us today and experience our commitment to exceptional service.
                            Your inquiries are important to us, and we’ll get back to you as quickly as possible.
                        </p>
                        <ContactUs/>
                    </div>
                    <div className="contact-section w-1/2 sm:w-full">
                        <img src={ContactUsIMG} alt="Contact Us" className="contact-image" />
                    </div>
                </section>


            </div>
        </motion.div>
    );
};

export default Contact;
