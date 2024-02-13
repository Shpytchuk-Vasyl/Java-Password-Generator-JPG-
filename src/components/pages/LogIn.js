import React from 'react';
import {BackgroundImage} from "../completed/BackgroundImage";
import {RegistrationForm} from "../completed/RegistrationForm";

function LogIn({setRegister}) {
    return (
            <RegistrationForm style="--login" setRegister={setRegister}/>
    );
}

export default LogIn;