import React, {useState, useEffect} from 'react';
import {EnvelopeIcon, PhoneIcon, UserIcon, HeartIcon, ShoppingBagIcon} from '@heroicons/react/20/solid'
import {NavLink} from 'react-router-dom'


const HeaderBasic = (props) => {

    let link = "";
    switch (props.link) {
        case "email":
            link = <div className="flex headerEmail">
                <EnvelopeIcon className="heroIcon"/>
                <a className=" ml-[10px]" href="mailto:hekto@gmail.com">hekto@gmail.com</a>
            </div>
            break;
        case "phone":
            link = <div className="flex">
                <PhoneIcon className="heroIcon"/>
                <a className=" ml-[10px]" href="tel:+38765750008">+38765750008</a>
            </div>
            break;
        case "user-logged-in":
            link = <div className="flex ">
                <NavLink className="flex" to="/login">Login <UserIcon className="heroIcon  ml-[10px]"/></NavLink>

            </div>
            break;

        case"user-logged-out":
            link=<div>
                <NavLink to="/profile">Profile</NavLink>*/}
                <NavLink onClick={handleLogout}>Logout</NavLink>
            </div>
            break;
        case "wishlist":
            link = <div className="flex">
                <NavLink className="flex" to="/wishlist">Wishlist<HeartIcon className="heroIcon ml-[10px]"/></NavLink>
            </div>
            break;
        case "cart":
            link = <div>
                <NavLink to="/cart"><ShoppingBagIcon className="heroIcon"/></NavLink>

            </div>
            break;
        default:

    }

    return (
        <div className="flex justify-center items-center headerContainer">
            {link}
        </div>
    );
};

export default HeaderBasic;