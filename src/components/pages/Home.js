import "../../App.css"
import "./Home.css"
import React from 'react';
import {BackgroundImage} from "../BackgroundImage";
import {Button} from "../Button";

function Home() {
    return (
        <>
            <BackgroundImage>
                <div className="home-container">
                    <h1>Generate</h1>
                    <p>What are you waiting for?</p>
                    <div className="home-btns">
                        <Button
                            className="btns"
                            to="/"
                            buttonStyle="btn--outline"
                            buttonSize="btn--large">
                            GET STARTED
                        </Button>
                    </div>
                </div>
            </BackgroundImage>
        </>
    );
}

export default Home;