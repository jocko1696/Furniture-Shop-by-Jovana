export default [
    {
        name: "Home",
        link: "/",
        classes: "nav-item nav-item-1",
        submenu: "false",

    },
    {
        name: "Products",
        link: "/products",
        classes: "nav-item nav-item-2 relative group",
        submenu: "true",
        sub: [
            {
                head: "Bedroom",
                subLinks: [
                    {name: "Beds", link: "/products/bed"},
                    {name: "Nightstands & Tables", link: "/products/nightstands-and-tables"},
                    {name: "Dressers & Armoires", link: "/products/dressers-and-armoires"},

                ],
            },

            {
                head: "Living",
                subLinks: [
                    {name: "Sofas & Loveseats", link: "/products/sofas-and-loveseats"},
                    {name: "Coffe tables", link: "/products/coffe-tables"},

                ],
            },

        ]
    },
    {
        name: "Blog",
        link: "/blog",
        classes: "nav-item nav-item-3",
        submenu: "false",

    },
    {
        name: "FAQ",
        link: "/faq",
        classes: "nav-item nav-item-3",
        submenu: "false",

    },
    {
        name: "About",
        link: "/about-us",
        classes: "nav-item nav-item-4",
        submenu: "false",

    },
    {
        name: "Contact",
        link: "/contact-us",
        classes: "nav-item nav-item-5",
        submenu: "false",

    },
]