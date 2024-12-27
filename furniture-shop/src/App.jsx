import React from "react";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx"
import HeroFooter from "./components/HeroFooter.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from "./pages/index"
import Blog from "./pages/blog"
import Products from "./pages/products"
import ProductDetail from "./pages/product-detail"
import Contact from "./pages/contact-us"
import LoginHeader from "./pages/login"
import RegisterPage from "./pages/register"
import Wishlist from "./pages/wishlist"
import Cart from "./pages/cart"
import AboutUs from "./pages/about-us"
import OrderCompleted from "./pages/order-completed"
import OrderCanceled from "./pages/order-canceled"
import {AuthProvider} from "./context/useAuthContext";
import Administration from '../cms/pages/Administration.jsx';
import SingleBlogPage from "./components/SingleBlog.jsx";
import FAQ from  "./pages/faq.jsx"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer


const AppLayout = ({ children }) => {
    const location = useLocation();

    // Check if the current route is part of the admin panel
    const isAdminRoute = location.pathname.startsWith('/administration');

    return (
        <>
            {!isAdminRoute && <Header />}
            {!isAdminRoute && <Navbar />}
            <main>{children}</main>
            {!isAdminRoute && <HeroFooter />}
            {!isAdminRoute && <FooterComponent />}
        </>
    );
};




function App() {

    return (
        <AuthProvider>
            <Router>
                <AppLayout>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/products/' element={<Products/>}/>
                    <Route path='/products/:id' element={<ProductDetail/>}/>
                    <Route path='/contact-us' element={<Contact/>}/>
                    <Route path='/blog' element={<Blog/>}/>
                    <Route path="/blog/:id" element={<SingleBlogPage />} /> {/* Dynamic route for single blog */}
                    <Route path='/login' element={<LoginHeader/>}/>
                    <Route path='/wishlist' element={<Wishlist/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/order-completed' element={<OrderCompleted/>}/>
                    <Route path='/order-canceled' element={<OrderCanceled/>}/>
                    <Route path="/faq" element={<FAQ/>} />

                    {/* Load the admin panel */}
                    <Route path="/administration/*" element={<Administration />} />
                </Routes>
                </AppLayout>


                {/* Add ToastContainer here to show toast notifications */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
            </Router>
        </AuthProvider>


    )
}

export default App
