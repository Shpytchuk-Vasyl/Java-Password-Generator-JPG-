import React from 'react';
import {RegistrationForm} from "../RegistrationForm";
import {BackgroundImage} from "../BackgroundImage";
function SignUp() {
    return (
        <BackgroundImage>
            <RegistrationForm style="--signup"/>
        </BackgroundImage>
    );
}

export default SignUp;