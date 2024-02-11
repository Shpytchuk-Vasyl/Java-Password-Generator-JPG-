import React from 'react';
import {BackgroundImage} from "../completed/BackgroundImage";
import {RegistrationForm} from "../completed/RegistrationForm";

function LogIn({setRegister}) {
    return (
        <BackgroundImage>
            <RegistrationForm style="--login" setRegister={setRegister}/>
        </BackgroundImage>
    );
}

export default LogIn;