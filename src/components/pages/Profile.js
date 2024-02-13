import React from 'react';
import PasswordCard from "../PasswordCard"
import "./Profile.css"

function Profile() {
    return (
            <div className="profile-cards">
                <PasswordCard _name="Gmail" _password="pass"/>
                <PasswordCard _name="Instagram" _password="pass"/>
                <PasswordCard _name="Gmail" _password="pass"/>
                <PasswordCard _name="Instagram" _password="pass"/>
                <PasswordCard _name="Gmail" _password="pass"/>
                <PasswordCard _name="Instagram" _password="pass"/>
            </div>
    );
}

export default Profile;