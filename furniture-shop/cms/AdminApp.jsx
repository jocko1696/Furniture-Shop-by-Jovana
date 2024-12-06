import React, {useState} from 'react';
import {Box, MantineProvider, Text} from "@mantine/core";
import Sidebar from "./components/Sidebar.jsx";
import ProductForm from "./components/ProductForm.jsx";

const AdminApp = () => {
    const [activePage, setActivePage] = useState('home');

    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Text size="lg" style={{ color: 'rgb(108, 43, 217)' }}>Welcome Admin to administrator panel !</Text>;
            case 'products':
                return <ProductForm />;
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
                    height:"100%",
                }}
            >
                {renderPage()}
            </Box>
        </Box>
        </MantineProvider>
    );
};

export default AdminApp;
