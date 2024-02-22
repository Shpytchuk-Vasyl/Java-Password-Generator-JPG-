import React, {useState} from 'react';
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


    function handleCallback(status, data) {

        toast(data, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type : status === 200 ? "success" : "error"})

    }



    const registerUser = () => {

        const validation = UserService.validUserData(email,password1,password2)
        if(validation.isEmailValid && validation.isPasswordNotEmpty && validation.doPasswordsMatch && validation.isPasswordGreater8) {
            AuthService.signup(email, password1, (status, data) => {
                handleCallback(status,data)
                setTimeout(() => {
                    if(status === 200) window.location.href = '/';
                }, 3000);

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
            setTimeout(() => {
            if(!validation.doPasswordsMatch) {
                setPassword2("")
            }}, 3000)
        }
    }
    const loginUser = () => {

        const validation = UserService.validUserData(email,password1,password1)
        if(validation.isEmailValid && validation.isPasswordNotEmpty && validation.doPasswordsMatch && validation.isPasswordGreater8) {
            AuthService.login(email, password1, (status, data) => {
                handleCallback(status,data)
                setTimeout(() => {
                    if(status === 200) window.location.href = '/';
                }, 2000);

            })
        } else {

            const msg = !validation.isEmailValid ? "Invalid email address" :
                    !validation.isPasswordNotEmpty ? "Password can't be empty" :
                    !validation.isPasswordGreater8 ? "Password is short, at least 8 characters are required" : ""

            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
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
                {checkStyle === STYLE[0] && <button className="submit-button" onClick={registerUser}>Sign Up</button>}
                {checkStyle === STYLE[1] && <button className="submit-button" onClick={loginUser}>Log In</button>}
            </div>
            <div className="form-change-form">
                {checkStyle === STYLE[0] && <p>Are you a member? <Link to="/log in" className="form-change-form-link">Log in now</Link></p>}
                {checkStyle === STYLE[1] && <p>Not a member yet? <Link to="/sign up" className="form-change-form-link">Register now</Link></p>}
            </div>
            <button className="submit-button with-google" onClick={ () =>
                AuthService.loginWithGoogle((status, msg) => {
                handleCallback(status, msg)
                setTimeout(() => {
                    if(status ? (status === 200) : false) window.location.href = '/';
                }, 3000);
            })}>
                <div className="icon">
                    <img
                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                        alt="Continue with google"/>
                </div>
                <div className="text">
                    Continue with Google
                </div>
            </button>
            <ToastContainer/>
        </div>
    )
}
