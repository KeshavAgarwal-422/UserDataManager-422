import React from "react";

const logo = require("../Assets/bharatOne_logo.png")

const Navbar = ({ searchTerm, setSearchTerm }) => {
    return (<>
        <div className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <input
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </>);
};

export default Navbar;
