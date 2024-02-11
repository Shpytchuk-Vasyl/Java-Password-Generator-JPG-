import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "./Button";
import "./Navbar.css"
import person from "../Person";




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
    const closeOnClick = () => setClick(false);

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeOnClick}>
                    JPG <i className="fa fa-lock"/>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"} onClick={closeOnClick}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-links">Profile</Link>
                    </li>
                    {!person.isRegister() && <li className="nav-item">
                        <Link to="/sign up" className="nav-links-mobile">Sign Up</Link>
                    </li>
                    }
                    {!person.isRegister() && <li className="nav-item">
                        <Link to="/log in" className="nav-links-mobile">Log In</Link>
                    </li>
                    }
                    {person.isRegister() && <li className="nav-item">
                        <Link to="/" className="nav-links-mobile">Log Out</Link>
                    </li>
                    }

                </ul>
                {button && !person.isRegister() && <Button to="/sign up" buttonStyle="btn--outline">Sign Up</Button>}
                {button && !person.isRegister() && <Button to="/log in" buttonStyle="btn--outline">Log In</Button>}
                {button && person.isRegister() && <Button to="/log out" buttonStyle="btn--outline">Log Out</Button>}
            </div>
        </nav>
        </>
    );
}

export default Navbar;