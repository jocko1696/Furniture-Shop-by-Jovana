import React from "react";
import {useState,useEffect} from "react";
import HeroComponent from "../components/HeroComponent.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import CardSection from "../components/CardSection.jsx";
import Tabs from "../components/Tabs.jsx";
import BreadCrumb from "../components/BreadCrumb.jsx";

const Home = () => {
    return (
        <div>
            <HeroComponent/>
            <ProductCarousel />
            <Tabs />
            <CardSection />
            {/*<BreadCrumb />*/}
        </div>
    );
};

export default Home;