import React from 'react';
import {BackgroundImage} from "../BackgroundImage";
import {RegistrationForm} from "../RegistrationForm";

function LogIn() {
    return (
        <BackgroundImage>
            <RegistrationForm style="--login"/>
        </BackgroundImage>
    );
}

export default LogIn;