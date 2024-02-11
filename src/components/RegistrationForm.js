import React from 'react';
import "./RegistrationForm.css"
import {Link} from "react-router-dom";

const STYLE = ["--signup", "--login"]
export const RegistrationForm = ({style}) => {
    const checkStyle = STYLE.includes(style) ? style : STYLE[0]

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>{checkStyle === STYLE[0] ? "Sign Up" : "Log In"}</h1>
                <div className="form-header-underline"></div>
            </div>
            <div className="form-iputs">
                <input type="form-iput-email"/>
                <input type="form-iput-password"/>
                {checkStyle === STYLE[0] && <input type="form-iput-password"/>}
            </div>
            <div className="form-submit">
                    {checkStyle === STYLE[0] && <button className="submit">Sign Up</button>}
                    {checkStyle === STYLE[1] && <button className="submit">Log In</button>}
            </div>
            <div className="form-change-form">
                {checkStyle === STYLE[0] && <p>If your already registered <Link to="/log in">log in</Link></p>}
                {checkStyle === STYLE[1] && <p>If your are not registered <Link to="/sign up">sign up</Link></p>}
            </div>
            <div className="form-google-button">

            </div>
        </div>
)
}
