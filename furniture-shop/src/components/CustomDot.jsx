import React from 'react';

const CustomDot = ({ onMove, index, onClick, active }) => {

        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        return (
            <li
                className={active ? "active customDot" : "inactive customDot"}
                onClick={() => onClick()}
            >
                {/*{index + 1}*/}
            </li>
        );

};

export default CustomDot;
