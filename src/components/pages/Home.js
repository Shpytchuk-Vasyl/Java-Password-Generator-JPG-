import "../../App.css"
import "./Home.css"
import React from 'react';
import {Button} from "../Button";
import Generator from "../completed/Generator";

function Home(  ) {
    return (
        <>
                <div className="home-container">
                    <h1>Generate</h1>
                    <p>What are you waiting for?</p>
                    <div className="home-btns">
                        <Button
                            className="btns"
                            to="/"
                            buttonStyle="btn--outline"
                            buttonSize="btn--large"
                            onClick={() => {
                                window.scrollBy({
                                    top: 600,
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            GET STARTED
                        </Button>
                    </div>
                    <Generator />
                </div>
        </>
    );
}

export default Home;