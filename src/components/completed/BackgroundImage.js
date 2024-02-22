import React from 'react';
import "./BackgroundImage.css"
import {ToastContainer} from "react-toastify";


export const BackgroundImage = ({children}) => {

    return (
        <div className="background-image-container" id="background-image-container">
            {children}
            <ToastContainer/>
        </div>
    );
};