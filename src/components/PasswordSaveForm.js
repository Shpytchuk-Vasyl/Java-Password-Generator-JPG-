import React, { useState } from 'react';
import UserService from "../services/UserService";
import AuthService from "../services/auth/AuthService";
import {toast} from "react-toastify";
import "./PasswordSaveForm.css"
const PasswordSaveForm = ({password, isVisible, handleCancel}) => {
    const [name, setName] = useState('');


    function handleSave() {
        const owner = AuthService.getUser()
        UserService.saveUserPassword(
            {
                "name": name,
                "password": password,
                "owner": owner
            }, (status, data) => {
            toast(data, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type : status === 200 ? "success" : "error"
            });
            })
        handleCancel()
    }

    return (
        <>{
            isVisible
            &&
        <div className="password-form">
            <h2>Details</h2>
            <div className="password-form-container">

            <label  htmlFor="name">Enter name for the password:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                id="password"
                value={password}
                readOnly
            />
            <div className="button-container">
                <div onClick={handleSave}>Save</div>
                <div onClick={handleCancel}>Cancel</div>
            </div>
            </div>
        </div>
        }
        </>
    );
};

export default PasswordSaveForm;
