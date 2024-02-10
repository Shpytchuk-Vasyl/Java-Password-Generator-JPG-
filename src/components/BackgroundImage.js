import React from 'react';
import {Button} from "./Button";
import "./BackgroundImage.css"
function BackgroundImage() {
    return (
        <div className="background-image-container">
            {/*<img alt="img" src="../../public/images/img-1.jpg"></img>*/}
            <h1>Generate</h1>
            <p>What are uou waiting for?</p>
            <div className="background-image-btns">
                <Button
                    className="btns"
                    to="/"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large">
                    GET STARTED
                </Button>
            </div>
        </div>
    );
}

export default BackgroundImage;