import React, {useEffect} from 'react';
import "./RegistrationForm.css"
import {Link} from "react-router-dom";
import person from "../Person";

const STYLE = ["--signup", "--login"]
export const RegistrationForm = ({style}) => {

    useEffect(() => {

        window.google.accounts.id.initialize({
            client_id: "209204224730-mg6cskm3deja5hb48shsqia7kjg4761n.apps.googleusercontent.com",
            callback: handleCallback
        })

        window.google.accounts.id.renderButton(
            document.getElementById("form-google-button"),
            {theme: "outline",
                size: "large",
                width: "300px",
                text: "continue_with"}
        )
    }, []);

    function handleCallback(response) {
        //send token to backend and clear navbar
        console.log(response.credential)
        person.setRegister(true)
    }


    const checkStyle = STYLE.includes(style) ? style : STYLE[0]

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>{checkStyle === STYLE[0] ? "Sign Up" : "Log In"}</h1>
                <div className="form-header-underline"></div>
            </div>
            <div className="form-inputs">
                <div className="form-input">
                    <i className="fa fa-envelope"/>
                    <input type="form-input-email" placeholder="Enter email adress"/>
                </div>
                <div className="form-input">
                    <i className="fa fa-lock"/>
                    <input type="form-input-password" placeholder="Enter password"/>
                </div>
                {checkStyle === STYLE[0] &&
                    <div className="form-input">
                        <i className="fa fa-lock"/>
                        <input type="form-input-password" placeholder="Repeat password"/>
                    </div>}
            </div>
            <div className="form-submit">
                    {checkStyle === STYLE[0] && <button className="submit">Sign Up</button>}
                    {checkStyle === STYLE[1] && <button className="submit">Log In</button>}
            </div>
            <div className="form-change-form">
                {checkStyle === STYLE[0] && <p>Are you a member? <Link to="/log in" className="form-change-form-link">Log in now</Link></p>}
                {checkStyle === STYLE[1] && <p>Not a member yet? <Link to="/sign up" className="form-change-form-link">Register now</Link></p>}
            </div>
            <div id="form-google-button" className="form-google-button">

            </div>
        </div>
    )
}
