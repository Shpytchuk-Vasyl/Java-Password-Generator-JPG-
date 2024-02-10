import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "./Button";
import "./Navbar.css"
function Navbar() {
    const [click,setClick] = useState(false)
    const [button,setButton] = useState(true)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }
    window.addEventListener("resize", showButton)
    useEffect(() => {
     showButton()
    }, []);

    const handleClick = () => setClick(!click);

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-log" onClick={handleClick}>
                    JPG <i className="fa fa-lock"/>
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
                    <li className="nav-item">
                        <Link to="/sing up" className="nav-links-mobile">Sing up</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sing up" className="nav-links-mobile">Log in</Link>
                    </li>
                </ul>
                {button && <Button to="/sing up" buttonStyle="btn--outline">Sing Up</Button>}
                {button && <Button to="/log in" buttonStyle="btn--outline">Log In</Button>}
            </div>
        </nav>
        </>
    );
}

export default Navbar;