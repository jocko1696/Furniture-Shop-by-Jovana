import React, {useState} from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel.jsx';
import ManageProducts from './components/ManageProducts.jsx';
import {Box, MantineProvider, Text} from "@mantine/core";
import Sidebar from "./components/Sidebar.jsx";

const AdminApp = () => {
    const [activePage, setActivePage] = useState('home');

    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Text size="lg" style={{ color: 'rgb(108, 43, 217)' }}>Welcome to the Home Tab!</Text>;
            case 'products':
                return <Text size="lg" style={{ color: 'rgb(108, 43, 217)' }}>Manage your Products here!</Text>;
            default:
                return <Text size="lg" style={{ color: 'rgb(108, 43, 217)' }}>Page not found</Text>;
        }
    };
    return (
        <MantineProvider>
        <Box style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Sidebar onNavigate={setActivePage} />

            {/* Content Area */}
            <Box
                style={{
                    flexGrow: 1,
                    padding: '20px',
                    backgroundColor: '#f4f4f4',
                    color: 'rgb(108, 43, 217)', // Text color in content area
                }}
            >
                {renderPage()}
            </Box>
        </Box>
        </MantineProvider>
    );
};

export default AdminApp;
