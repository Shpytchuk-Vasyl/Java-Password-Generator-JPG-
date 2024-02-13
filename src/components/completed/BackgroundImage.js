import React from 'react';
import "./BackgroundImage.css"


export const BackgroundImage = ({children}) => {

    return (
        <div className="background-image-container" id="background-image-container">
            {children}
        </div>
    );
};