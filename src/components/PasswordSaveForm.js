import React, { useState } from 'react';
import UserService from "../services/UserService";
import AuthService from "../services/auth/AuthService";
import {toast} from "react-toastify";
const PasswordSaveForm = ({password, isVisible, handleCancel}) => {
    const [name, setName] = useState('');


    function handleSave() {

        UserService.saveUserPassword(
            {
                "name": name,
                "password": password,
                "owner": AuthService.getUser()
            }, (status, data) => {

            toast.success(data, {
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
            <h2>Enter password details</h2>
            <label htmlFor="name">Enter name for the password (English):</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password">Enter password:</label>
            <input
                type="password"
                id="password"
                value={password}
                readOnly
            />
            <div className="button-container">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
        }
        </>
    );
};

export default PasswordSaveForm;
