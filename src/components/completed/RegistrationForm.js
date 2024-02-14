import React, {useEffect, useState} from 'react';
import "./RegistrationForm.css"
import {Link} from "react-router-dom";
import AuthService from "../../services/auth/AuthService";
import UserService from "../../services/UserService";
import {toast, ToastContainer} from "react-toastify";


const STYLE = ["--signup", "--login"]
export const RegistrationForm = ({style}) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")


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
        window.location.href = '/'
    }

    const registerUser = () => {

        const validation = UserService.validUserData(email,password1,password2)
        if(validation.isEmailValid && validation.isPasswordNotEmpty && validation.doPasswordsMatch && validation.isPasswordGreater8) {
            AuthService.signup(email, password1, (status, data) => {
                toast(data, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type : status === 200 ? "success" : "error"})
                window.location.href = '/'

            })
        } else {

            const msg = !validation.isEmailValid ? "Invalid email address" :
                    !validation.isPasswordNotEmpty ? "Password can't be empty" :
                    !validation.doPasswordsMatch ? "Passwords don't match" :
                    !validation.isPasswordGreater8 ? "Password is short, at least 8 characters are required" : ""

            toast.error(msg, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })

            if(!validation.doPasswordsMatch) {
                setPassword2("")
            }
        }
    }
    const loginUser = () => {

        const validation = UserService.validUserData(email,password1,password1)
        if(validation.isEmailValid && validation.isPasswordNotEmpty && validation.doPasswordsMatch && validation.isPasswordGreater8) {
            AuthService.login(email, password1, (status, data) => {
                toast(status === 200 ? "Success login" : data, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type : status === 200 ? "success" : "error"})
                window.location.href = '/'

            })
        } else {

            const msg = !validation.isEmailValid ? "Invalid email address" :
                    !validation.isPasswordNotEmpty ? "Password can't be empty" :
                    !validation.isPasswordGreater8 ? "Password is short, at least 8 characters are required" : ""

            toast.error(msg, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
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
                    <input type="form-input-email" placeholder="email@example.com"
                           value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="form-input">
                    <i className={passwordShown ? "fa fa-unlock" : "fa fa-lock"}
                       onClick={event => setPasswordShown(!passwordShown)}/>
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter password"
                           value={password1} onChange={e=>setPassword1(e.target.value)} />
                </div>
                {checkStyle === STYLE[0] &&
                    <div className="form-input">
                        <i className={passwordShown ? "fa fa-unlock" : "fa fa-lock"}
                           onClick={event => setPasswordShown(!passwordShown)}/>
                        <input type={passwordShown ? "text" : "password"} placeholder="Repeat password"
                               value={password2} onChange={e=>setPassword2(e.target.value)}/>
                    </div>
                }
            </div>
            <div className="form-submit">
                {checkStyle === STYLE[0] && <button className="submit" onClick={registerUser}>Sign Up</button>}
                {checkStyle === STYLE[1] && <button className="submit" onClick={loginUser}>Log In</button>}
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
