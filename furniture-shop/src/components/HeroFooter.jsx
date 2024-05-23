import React from 'react';

const HeroFooter = () => {
    return (
        <section className="heroFooterSection flex justify-between lg:flex-col  pb-[40px] md:pb-[100px]">

            <div className="hf-left flex justify-center items-center lg:w-full">
                {/*<img src={`../../public/images/Sofa-lineart.svg`} />*/}
                <div className="furnitureShapesContainer py-[100px] relative">
                    <div className="shape "></div>
                </div>
            </div>
            <div className="hf-right flex flex-col justify-center items-center lg:w-full">
                <div>
                    <h1 className="sectionHeadingText max-w-[370px]">Unique Features of Latest & Trending Products</h1>
                    <ul className="list-disc mb-[40px] pl-[20px]">
                        <li>All frameworks constructed with hardwood and solid laminates</li>
                        <li>Reinforced with double wood dowels,glue,screw</li>
                        <li>Arms,backs and seats are structurally reinforced</li>
                    </ul>
                    <div className="flex gap-4 md:flex md:justify-center	">
                        <a href="" className=" addToCart text-white flex items-center justify-center bg-pink-600 px-[50px] py-[15px]">Read More</a>
                        {/*<div className="flex flex-col ">*/}
                        {/*    <span>Furniture</span>*/}
                        {/*    <span>$32</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default HeroFooter;