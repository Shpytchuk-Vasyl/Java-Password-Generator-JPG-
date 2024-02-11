import React from 'react';
import {BackgroundImage} from "../BackgroundImage";
import PasswordCard from "../PasswordCard"
import "./Profile.css"

function Profile() {
    return (
        <BackgroundImage>
            <div className="profile-cards">
                <PasswordCard name="Gmail" password="pass"/>
                <PasswordCard name="Instagram" password="pass"/>
            </div>
        </BackgroundImage>
    );
}

export default Profile;