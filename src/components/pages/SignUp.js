import React from 'react';
import {RegistrationForm} from "../completed/RegistrationForm";
import {BackgroundImage} from "../completed/BackgroundImage";
import "../completed/BackgroundImage.css"
import "../completed/RegistrationForm.css"
function SignUp({setRegister}) {
    return (
        <BackgroundImage>
            <RegistrationForm style="--signup" setRegister={setRegister}/>
        </BackgroundImage>
    );
}

export default SignUp;