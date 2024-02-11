import React from 'react';
import {BackgroundImage} from "../BackgroundImage";
import {RegistrationForm} from "../RegistrationForm";

function LogIn({setRegister}) {
    return (
        <BackgroundImage>
            <RegistrationForm style="--login" setRegister={setRegister}/>
        </BackgroundImage>
    );
}

export default LogIn;