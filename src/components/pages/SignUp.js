import React from 'react';
import {RegistrationForm} from "../RegistrationForm";
import {BackgroundImage} from "../BackgroundImage";
import "../BackgroundImage.css"
import "../RegistrationForm.css"
function SignUp({setRegister}) {
    return (
        <BackgroundImage>
            <RegistrationForm style="--signup" setRegister={setRegister}/>
        </BackgroundImage>
    );
}

export default SignUp;