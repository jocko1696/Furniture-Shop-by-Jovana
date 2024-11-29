// import React from "react";
// import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import CustomNavLink from "./CustomNavLink.jsx";
import {ReactComponent as Hamburger} from '../../public/images/hamburgerMenu.svg'
// import SearchComponent from "./SearchComponent.jsx";
import links from "../data/links";

import React, {useContext, useEffect, useState} from 'react';
import Dropdown from "./Dropdown"
import HeaderBasic from "./HeaderBasic.jsx";
import {EnvelopeIcon, PhoneIcon, UserIcon, HeartIcon, ShoppingBagIcon ,ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/20/solid'
// import {NavLink} from 'react-router-dom'
import axios from "axios";
import Cookies from 'js-cookie';
// import { usePage }  from "./PageContext.jsx";
import Auth from "./Auth.jsx";


const language = [
    {href: '/english', label: 'English'},
    {href: '/german', label: 'German'},
    {href: '/serbian', label: 'Serbian'}

]

const money = [
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


const NavbarItems = (props) => {


    let footer = false;
    let footerClass=";"

    if (props.footer !== footer) {
        footer = true;


    }
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

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
        <nav id ={`${footer ===true ? 'footer-nav' : 'header-nav' }`} className="flex items-center gap-40 self-stretch">

            <ul id ={`${footer ===true ? 'footer-elements' : 'header-elements' }`} className={`nav navbar-elements md:flex-col self-stretch items-center ${showNavbar && 'active'} ${footer ===true && 'footer-elements' }`}>
                {
                    links.map((link, index) => (
                        <li className={`flex self-stretch items-center ${link.classes}`}>
                            <CustomNavLink to={link.link}
                            >{link.name}</CustomNavLink>
                            {link.submenu && (
                                <div className="hidden absolute z-10 submenu-products group-hover:block hover:block ">
                                    <ul className="submenu flex ">
                                        {link?.sub?.map((subLink) => (

                                            <div className="pr-[50px] ">
                                                <p className="pb-[15px] font-semibold text-lg">{subLink.head}</p>
                                                {
                                                    subLink?.subLinks?.map((subcategories, index) => (
                                                        <div key={`${index}-${subcategories.name}`} className="py-0.5">
                                                            <NavLink
                                                                to={subcategories.link}

                                                            >
                                                                {subcategories.name}

                                                            </NavLink>
                                                        </div>
                                                    ))
                                                }
                                            </div>


                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                }

                {showNavbar === true &&

                    <ul className="nestedList">

                        <li className="flex w-[100%]">
                            <Auth/>
                        </li>
                        <li className="flex">
                            <NavLink className="flex justify-end" to="/wishlist">Wishlist<HeartIcon
                                className="heroIcon ml-[10px]"/></NavLink>
                        </li>
                        <li className="flex ">

                            <NavLink className="flex justify-end"  to="/cart">Cart<ShoppingBagIcon className="heroIcon ml-[10px]"/></NavLink>
                        </li>


                    </ul>
                }

            </ul>


            {/*{footer === false &&*/}
            {/*    <SearchComponent/>*/}
            {/*}*/}

            {footer === false &&
                <div className="menu-icon hidden md:block" onClick={handleShowNavbar}>
                    <Hamburger/>
                </div>
            }


        </nav>

    );
};

export default NavbarItems;