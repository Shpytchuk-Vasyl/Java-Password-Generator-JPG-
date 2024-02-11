import React from 'react';
import {RegistrationForm} from "../RegistrationForm";
import {BackgroundImage} from "../BackgroundImage";
import "../BackgroundImage.css"
import "../RegistrationForm.css"
function SignUp() {
    return (
        <BackgroundImage>
            <RegistrationForm style="--signup"/>
        </BackgroundImage>
    );
}

export default SignUp;