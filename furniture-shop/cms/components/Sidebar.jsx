// components/Sidebar.jsx
import React from 'react';
import { Box, Group, Text, UnstyledButton } from '@mantine/core';

const Sidebar = ({ onNavigate }) => {
    const navigationItems = [
        { label: 'Home', key: 'home' },
        { label: 'Products', key: 'products' },
    ];

    return (
        <Box
            style={{
                width: '250px',
                height: '100vh',
                backgroundColor: 'rgb(108, 43, 217)', // Primary color
                color: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Sidebar Header */}
            <Text size="xl" weight={700} align="center" style={{ marginBottom: '30px' }}>
                Admin Panel
            </Text>

            {/* Navigation Items */}
            <Group direction="column" spacing="md">
                {navigationItems.map((item) => (
                    <UnstyledButton
                        key={item.key}
                        onClick={() => onNavigate(item.key)}
                        style={{
                            textAlign: 'left',
                            padding: '10px 15px',
                            borderRadius: '5px',
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
