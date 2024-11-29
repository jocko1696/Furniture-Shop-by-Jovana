import React from "react";
import { MantineProvider, AppShell, Box, Group, Text, Tabs } from '@mantine/core'; // Import necessary Mantine components
import { HomeTab, ProductsTab } from "./Tabs.jsx"; // Your Tab Components for Home and Products
import { useLocation } from 'react-router-dom'; // To manage active links
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
    const location = useLocation(); // Get current route location

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colors: {
                    customPurple: [
                        "rgba(190, 144, 212, 0.1)",
                        "rgba(190, 144, 212, 0.3)",
                        "rgba(190, 144, 212, 0.5)",
                        "rgba(108, 43, 217, 0.7)",
                        "rgb(108, 43, 217)",
                    ],
                },
                primaryColor: "customPurple",
            }}
        >
            <AppShell
                padding="md"
                style={{ display: "flex", height: "100vh" }}
            >
                {/* Sidebar */}
                <Box
                    style={{
                        width: 250,
                        backgroundColor: "#f3f3f3",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Text align="center" size="xl" weight={500} style={{ marginBottom: '20px' }}>
                        Admin Panel
                    </Text>
                    <Group direction="column" spacing="xs">
                        {/* Use NavLink for Sidebar Navigation */}
                        <NavLink
                            label="Home"
                            active={location.pathname === "/home"} // Check if the current path is '/home'
                            component="a"
                            href="/home"
                            size="lg"
                        />
                        <NavLink
                            label="Products"
                            active={location.pathname === "/products"} // Check if the current path is '/products'
                            component="a"
                            href="/products"
                            size="lg"
                        />
                        {/* Add more NavLink components here */}
                    </Group>
                </Box>

                {/* Main Content */}
                {/*<Box style={{ flexGrow: 1, padding: '20px' }}>*/}
                {/*    <Tabs defaultValue="home">*/}
                {/*        <Tabs.List>*/}
                {/*            <Tabs.Tab value="home">Home</Tabs.Tab>*/}
                {/*            <Tabs.Tab value="products">Products</Tabs.Tab>*/}
                {/*        </Tabs.List>*/}

                {/*        /!* Tab Panels *!/*/}
                {/*        <Tabs.Panel value="home" pt="xs">*/}
                {/*            <HomeTab /> /!* Home Tab Content *!/*/}
                {/*        </Tabs.Panel>*/}

                {/*        <Tabs.Panel value="products" pt="xs">*/}
                {/*            <ProductsTab /> /!* Products Tab Content *!/*/}
                {/*        </Tabs.Panel>*/}
                {/*    </Tabs>*/}
                {/*</Box>*/}
            </AppShell>
        </MantineProvider>
    );
};

export default AdminPanel;
