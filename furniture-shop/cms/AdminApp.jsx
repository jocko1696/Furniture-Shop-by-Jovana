import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel.jsx';
import ManageProducts from './components/ManageProducts.jsx';

const AdminApp = () => {
    return (
        <div>
            <nav style={{ backgroundColor: '#6C2BD9', padding: '10px', color: '#FFF' }}>
                <Link to="/administration" style={{ marginRight: '10px', color: '#FFF' }}>
                    Home
                </Link>
                <Link to="/administration/products" style={{ color: '#FFF' }}>
                    Products
                </Link>
            </nav>
            <Routes>
                <Route path="/administration" element={<AdminPanel />} />
                <Route path="/administration/products" element={<ManageProducts />} />
            </Routes>

            <div>Jovan1111111111111111111111</div>
        </div>
    );
};

export default AdminApp;
