import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "../Button";
import "./Navbar.css"
import AuthService from "../../services/auth/AuthService";


function Navbar() {
    const [click,setClick] = useState(false)
    const [button,setButton] = useState(true)
    const [user, setUser] = useState(null)

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
                        <Link to={user ? "/profile" : "/sign up"} className="nav-links">Profile</Link>
                    </li>
                    {(user === null) && <li className="nav-item">
                        <Link to="/sign up" className="nav-links-mobile">Sign Up</Link>
                    </li>
                    }
                    {(user === null) && <li className="nav-item">
                        <Link to="/log in" className="nav-links-mobile">Log In</Link>
                    </li>
                    }
                    {(user !== null) && <li className="nav-item" onClick={e=>
                    {
                        AuthService.logout()
                        setUser(null)
                    }}>
                        <Link to="/" className="nav-links-mobile">Log Out</Link>
                    </li>
                    }

                </ul>
                {button && (user === null) && <Button to="/sign up" buttonStyle="btn--outline">Sign Up</Button>}
                {button && (user === null) && <Button to="/log in" buttonStyle="btn--outline">Log In</Button>}
                {button && (user !== null) && <Button to="/" buttonStyle="btn--outline" onClick={e=>
                {
                    AuthService.logout()
                    setUser(null)
                }}>Log Out</Button>}
            </div>
        </nav>
        </>
    );
}

export default Navbar;