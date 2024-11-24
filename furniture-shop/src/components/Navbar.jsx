import React from "react";
import {useState} from 'react'
import NavbarItems from "./NavbarItems.jsx";
import {NavLink} from "react-router-dom";


export default function Navbar() {

    return (
        <section className="sectionNavbar bg-white py-[15px]">
            <header className="navbar centerContainer flex justify-between items-center py-5">
                {/*<img className="w-[90px]" src={furnitureLogo} alt="Missing picture"/>*/}
                <NavLink to="/"><h1 className="logoName ">Hekto</h1></NavLink>
                <NavbarItems footer={false}/>
            </header>
        </section>
    )
}