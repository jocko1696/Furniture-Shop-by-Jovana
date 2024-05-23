import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/20/solid'

const CustomNavLink = ({ to, children, ...rest }) => {
    const [isActive, setIsActive] = useState(false);
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        setIsSubMenuVisible(false); // Hide submenu when link is clicked
    };

    return (
        <NavLink
            to={to}
            activeClassName={isActive ? 'active' : ''}
            onClick={handleClick}
            {...rest}
        >
            {children}
            {/*{isActive && <span className="hero-chevron">&#9658;</span>}*/}
            {isActive ? <ChevronUpIcon className="chevron-up chevron" onClick={handleClick} /> : <ChevronDownIcon className="chevron-down chevron" onClick={handleClick} />}
        </NavLink>
    );
};

export default CustomNavLink;
