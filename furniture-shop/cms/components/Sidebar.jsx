// components/Sidebar.jsx
import React from 'react';
import { Box, Group, Text, UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onNavigate }) => {
    const navigationItems = [
        { label: 'Home', key: 'home' },
        { label: 'Products', key: 'products' },
        { label: 'Logout', key: 'logout' },
    ];

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include', // Ensures cookies are sent with the request
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('User successfully logged out');
                navigate('/'); // Redirect to the home page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleClick = (key) => {
        if (key === 'logout') {
            handleLogout();
        } else {
            onNavigate(key);
        }
    };

    return (
        <Box
            style={{
                width: '250px',
                height: '100vh',
                backgroundColor: 'rgb(108, 43, 217)', // Primary color
                color: 'white',
                padding: ' 20px 0',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Sidebar Header */}
            <Text size="xl" weight={700} align="center" style={{ marginBottom: '30px' }}>
                Admin Panel
            </Text>

            {/* Navigation Items */}
            <Group direction="column"
                   spacing="md"
                   style={{ display: 'flex', flexDirection: 'column' }}
            >
                {navigationItems.map((item) => (
                    <UnstyledButton
                        key={item.key}
                        // onClick={() => onNavigate(item.key)}
                        onClick={() => handleClick(item.key)}
                        style={{
                            textAlign: 'left',
                            padding: '10px 15px',
                            // borderRadius: '5px',
                            border:'1px solid white',
                            backgroundColor: 'rgba(190, 144, 212, 0.5)', // Secondary color
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(190, 144, 212, 0.8)')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(190, 144, 212, 0.5)')}
                    >
                        {item.label}
                    </UnstyledButton>
                ))}
            </Group>
        </Box>
    );
};

export default Sidebar;
