import React from 'react';
import {RegistrationForm} from "../completed/RegistrationForm";
import {ToastContainer} from "react-toastify";

function LogIn() {
    return (
        <>
            <RegistrationForm style="--login" />
    <ToastContainer/>
</>
    );
}

export default LogIn;