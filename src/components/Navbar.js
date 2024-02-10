import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {click} from "@testing-library/user-event/dist/click";

function Navbar() {
    const [click,setClick] = useState(false)

    const handleClick = () => setClick(!click);

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-log">
                    JPG<i className="fa fa-lock"/>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-links">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default Navbar;