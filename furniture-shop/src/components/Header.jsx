import React, {useContext, useEffect, useState} from 'react';
import Dropdown from "./Dropdown"
import HeaderBasic from "./HeaderBasic.jsx";
import {EnvelopeIcon, PhoneIcon, UserIcon, HeartIcon, ShoppingBagIcon} from '@heroicons/react/20/solid'
import {NavLink} from 'react-router-dom'
import axios from "axios";
import Cookies from 'js-cookie';
// import { usePage }  from "./PageContext.jsx";
import Auth from "./Auth.jsx";


const links = [
    {href: '/english', label: 'English'},
    {href: '/german', label: 'German'},
    {href: '/serbian', label: 'Serbian'}

]

const links2 = [
    {href: '/USD', label: 'USD'},
    {href: '/EUR', label: 'EUR'},
    {href: '/BAM', label: 'BAM'}

]

const headerLinks = [
    {name: 'email'},
    {name: 'phone'},
    {name: 'user'},
    {name: 'wishlist'},
    {name: 'cart'},
]

const Header = () => {


    const handleLogout = async (e) => {
        e.preventDefault();

        console.log("Logout");
        // Clear token from local storage
        localStorage.removeItem('token');
        // setLoggedIn(false);

        //Clear cookie
        Cookies.remove('token');
        const token = localStorage.getItem('token');
        setLoginState(token);
    };

    return (
        <section className="sectionHeader bg-purple-700 py-[4px]">
            {/*<p>Render Count: {renderCount}</p>*/}
            {/*<p>Current Page: {loggedIn}</p>*/}
            <div className="centerContainer flex justify-between md:py-[8px]">
                <div className="flex md:justify-between md:w-[100%] ">
                    <div className="flex headerEmail">
                        <EnvelopeIcon className="heroIcon"/>
                        <a className=" ml-[10px]" href="mailto:hekto@gmail.com">hekto@gmail.com</a>
                    </div>
                    <div className="flex hektoPhone">
                        <PhoneIcon className="heroIcon"/>
                        <a className=" ml-[10px]" href="tel:+38765750008">+38765750008</a>
                    </div>
                </div>
                <div className="flex gap-5 md:hidden">
                    <Dropdown
                        key={1}
                        {...links}

                    />
                    <Dropdown
                        key={2}
                        {...links2}

                    />
                    <div className="flex purpleHeader ">
                       <Auth/>
                    </div>
                    <div className="flex purpleHeader">
                        <NavLink className="flex" to="/wishlist">Wishlist<HeartIcon
                            className="heroIcon ml-[10px]"/></NavLink>
                    </div>
                    <div className="flex purpleHeader">
                        <NavLink to="/cart"><ShoppingBagIcon className="heroIcon"/></NavLink>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Header;