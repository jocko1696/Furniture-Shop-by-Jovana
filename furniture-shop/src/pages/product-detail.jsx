import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
const Products = () => {

    return (
        <section className="heroSectionProducts pageSection ">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Products</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
          <ProductDetail/>
        </section>
    );
};

export default Products;