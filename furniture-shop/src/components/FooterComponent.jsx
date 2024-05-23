import React from 'react';
import EmailComponent from "./EmailComponent.jsx";
import NavbarItems from "./NavbarItems.jsx";
import {BsFacebook} from "react-icons/bs";
import {RiInstagramFill} from "react-icons/ri";
import {AiFillTwitterCircle} from "react-icons/ai";


const FooterComponent = () => {
    return (
        <section className="footer flex flex-col pt-[60px]">
            <div className="footerCols centerContainer grid grid-cols-3 gap-[335px] md:flex md:flex-col md:gap-0">
                <div className="flex flex-col md:flex md:justify-center	">
                    <h1 className="fs-title mb-[20px] mt-[20px] md:text-center" id="fs-logoName">Hekto</h1>
                    <p className="fs-description">Buy furniture with style.</p>
                </div>
                <div className="">
                    <p className="fs-title mb-[20px] mt-[20px] text-right md:text-center">Contact Info</p>
                    <p className="text-right fs-description md:text-center">17 Princess Road, London</p>
                    <p className="text-right fs-description md:text-center">Greater London</p>
                    <a className="flex justify-end fs-description md:justify-center	" href="tel:0078265444">0078265444</a>
                </div>
                <div className="md:flex md:flex-col ">
                    <p className="fs-title mb-[20px] mt-[20px] text-right md:text-center">Links</p>
                    <NavbarItems footer={true} />
                </div>
                {/*<div className="flex  flex-col ">*/}
                {/*    <p className="fs-title mb-[20px] mt-[20px] text-right">Newsletter</p>*/}
                {/*    <EmailComponent/>*/}
                {/*</div>*/}
            </div>
            <div className="copyright py-[10px]" id="copyright">
                <div className="flex justify-between centerContainer items-center">
                    <div className="copyrightText">© Webecy - All Rights Reserved</div>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/"><BsFacebook /></a>
                        <a href="https://www.instagram.com/"><RiInstagramFill /></a>
                        <a href="https://twitter.com/"><AiFillTwitterCircle /></a>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default FooterComponent;