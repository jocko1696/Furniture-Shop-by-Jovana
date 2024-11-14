import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import Product from "../components/Product"
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Products = () => {

    //Part for button filter activity
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };


    // const [categoryNames, setCategoryNames] = useState(['Bedroom', 'Living']);
    // const [categories, setCategories] = useState(['Beds', 'Nightstands & Tables', 'Dressers & Armoires', 'Sofas & Loveseats', 'Coffe tables']);
    const [categoriesIndexes, setCategoriesIndexes] = useState(
        [
            "beds",
            "nightstands-and-tables",
            "dressers-and-armories",
            "sofas-and-loveseats",
            "coffe-tables"]
    )


    const [categories, setCategories] = useState([
        {
            name: "Bedroom", submenu: [
                {name: "Beds", link: "/beds", category: "beds", index: 0},
                {
                    name: "Nightstands & Tables",
                    link: "/nightstands-and-tables",
                    category: "nightstands-and-tables",
                    index: 1
                },
                {
                    name: "Dressers & Armories",
                    link: "/dressers-and-armories",
                    category: "dressers-and-armories",
                    index: 2
                },
            ]
        },

        {
            name: "Living", submenu: [
                {name: "Sofas & Loveseats", link: "/sofas-and-loveseats", category: "sofas-and-loveseats", index: 3},
                {name: "Coffe tables", link: "/coffe-tables", category: "coffe-tables", index: 4},
            ]
        }
    ]);


    const [checkedState, setCheckedState] = useState(new Array(categoriesIndexes.length).fill(false));
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        totalPages: 1,
        currentPage: 1,
    });
    const [openSubmenu, setOpenSubmenu] = useState({});

    const splitIndexFirst = 3;
    const toggleSubmenu = (index) => {
        setOpenSubmenu(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    // const splitIndexSecond =
    // const handleOnChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //         index === position ? !item : item
    //     );
    //
    //     setCheckedState(updatedCheckedState);
    //     fetchProducts(updatedCheckedState, pagination.currentPage, searchTerm);
    // };

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item

        );

console.log(updatedCheckedState);

        setCheckedState(updatedCheckedState);
        fetchProducts(updatedCheckedState, pagination.currentPage, searchTerm);
    };

    /******************GET PRODUCTS FROM DATABASE***********************/
    let furnitureProducts;
    const fetchProducts = async (checkedState, page, search) => {
        const selectedCategories = categoriesIndexes.filter((_, index) => checkedState[index]).join(',');

        try {
            const response = await axios.get(`http://localhost:5000/productsByParams?categories=${selectedCategories}&page=${page}&search=${search}`).then(function (response) {
                setProducts(response.data.docs);
                console.log(response.data.docs);
                // setTotalPages(response.data.totalPages);
                setPagination({
                    totalPages: response.data.totalPages,
                    currentPage: response.data.page,
                });
                // console.log("Total stranica   " + response.data.totalPages);
                // console.log("Trenutna stranica je  " + response.data.currentPage);

            })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts(checkedState, pagination.currentPage, searchTerm);
    }, [pagination.currentPage, searchTerm]);

    furnitureProducts = products.map((item, index) => {

        let latest;
        let trending;
        let featured;
        let specialOffer;
        let newArrival;
        let bestSeller;

        latest = !!item.tags.includes("latest");
        trending = !!item.tags.includes("trending");
        featured = !!item.tags.includes("featured");
        specialOffer = !!item.tags.includes("special-offer");
        newArrival = !!item.tags.includes("new-arrival");
        bestSeller = !!item.tags.includes("best-seller");

        return <Product
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            sale={item.sale}
            code={item.code}
            description={item.description}
            featured={featured}
            latest={latest}
            trending={trending}
            specialOffer={specialOffer}
            newArrival={newArrival}
            bestSeller={bestSeller}

        />

    })
    const handlePageChange = ({selected}) => {
        setPagination({...pagination, currentPage: selected + 1});
        console.log(selected + 1);
    };

    const handleSearch = () => {
        fetchProducts(checkedState, pagination.currentPage, searchTerm);
    };


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
            <div className="flex bg-white pageDivider ">
                <button
                    className={`filter-button ${isActive ? 'active' : ''}`}
                    onClick={handleToggle}

                >Filters</button>
                <div

                    className={`w-[30%] my-[70px] ml-[30px] left-container toggled-element ${isActive ? 'visible' : ''}`}
                >
                    {/*<Filter/>*/}
                    <div className="flex items-center pt-[27px] pb-[20px]">
                        <div className="flex space-x-1 w-[100%]">
                            <input
                                type="text"
                                className=" searchInput block w-full px-4 py-2 text-purple-700 bg-white border focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="px-4 text-white searchButton "
                                    onClick={handleSearch}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="sidebar product-page-sidebar">
                        <p className="product-type pt-[15px] font-semibold inline">PRODUCT TYPE</p>
                        <ul className="mt-[20px]">
                            {categories.map((item, index) => (
                                <li key={index}>
                                    <button className="cursor-pointer typeButtons font-medium" onClick={() => item.submenu ? toggleSubmenu(index) : null}>
                                        {item.name}
                                    </button>
                                    {item.submenu && openSubmenu[index] && (
                                        <ul className="submenu">
                                            {item.submenu.map((sub, subIndex) => (
                                                <li className="types" key={subIndex}>
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${sub.index}`}
                                                        name={sub.name}
                                                        value={sub.category}
                                                        checked={checkedState[sub.index]}
                                                        onChange={() => handleOnChange(sub.index)}
                                                    />
                                                    <label  className="ml-[7px]" htmlFor={`custom-checkbox-${sub.index}`}>{sub.name}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex w-[70%] my-[70px] mx-[30px] flex-col right-container">
                    <div className="d-flex flex-column ">
                        {furnitureProducts}
                    </div>


                    <div className="paginationContainer"><ReactPaginate
                        pageCount={pagination.totalPages}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    /></div>
                </div>
            </div>


        </section>
    );
};

export default Products;