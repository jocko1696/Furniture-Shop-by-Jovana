import React from "react";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx"
import HeroFooter from "./components/HeroFooter.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
// import {PageProvider} from "./components/PageContext.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
import {AuthProvider} from "./context/useAuthContext";


function App() {

    return (
        <AuthProvider>
            <Router>
                <Header/>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/products/' element={<Products/>}/>

                    <Route path='/products/:id' element={<ProductDetail/>}/>
                    <Route path='/contact-us' element={<Contact/>}/>
                    <Route path='/blog' element={<Blog/>}/>
                    <Route path='/login' element={<LoginHeader/>}/>
                    <Route path='/wishlist' element={<Wishlist/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                </Routes>
                <HeroFooter/>
                <FooterComponent/>
            </Router>
        </AuthProvider>


    )
}

export default App
