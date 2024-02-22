import React from 'react';
import {RegistrationForm} from "../completed/RegistrationForm";
import "../completed/BackgroundImage.css"
import "../completed/RegistrationForm.css"
import {ToastContainer} from "react-toastify";
function SignUp() {
    return (
        <>
            <RegistrationForm style="--signup"/>
            <ToastContainer/>
        </>
    );
}

export default SignUp;