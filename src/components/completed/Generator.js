import React, {useEffect, useRef, useState} from 'react';
import "./Generator.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../../services/UserService";
import PasswordSaveForm from "../PasswordSaveForm";
import AuthService from "../../services/auth/AuthService";

function Generator() {
    const [reliability, setReliability] = useState("very strong")
    const [passwordString, setPasswordString] = useState("")
    const [checkboxStates, setCheckboxStates] = useState({
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true,
        })
    const handleCheckboxChange = (checkboxName) => {
            setCheckboxStates(prevState => {
                const updatedStates = {
                    ...Object.fromEntries(
                        Object.entries(prevState).map(([name, value]) => [name, name === checkboxName ? !value : value])
                    ),
                };

                const activeCheckboxes = Object.values(prevState).filter(value => value);
                if (activeCheckboxes.length === 1 && prevState[checkboxName]) {
                    return prevState;
                }

                return updatedStates;
            });
        };
    const  [sliderLength, setSliderLength] = useState({
        min: 1,
        max: 50,
        value: 50,
        sliderValue: 100
    })
    const updateSliderLength = (length) => {
        setSliderLength(prevState => ({
            ...prevState,
            value: length,
            sliderValue: (length - 1 - prevState.min) / (prevState.max - 2 - prevState.min) * 100
        }));
    };
    const [saveClick, setSaveClick] = useState(false)


    const updateSlider = (newLength) => {
        updateSliderLength(newLength)
        document.getElementById("slider").style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + sliderLength.sliderValue + '%, #fff ' + sliderLength.sliderValue + '%, white 100%)'
        //document.getElementById("slider").value = newLength
    }

    const generate = () => {

        UserService.generatePassword(checkboxStates, {size: sliderLength.value}, (status, data) => {
            if (status === 200) {
                setPasswordString(data.password)
                setReliability(data.reliability)
            }
            else {
                toast.error("Server is not available now", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            };
        })
    }


    const copyToClipboard = () => {
        navigator.clipboard.writeText(passwordString)
        toast.success("Copy " + passwordString, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    return (
            <div className="generator-container" id="generator-container">
                <h1>Java Password Generator</h1>
                <p>Create strong and secure passwords to keep your account safe online.</p>
                <div className="input-container">
                    <div className="input-controler">
                        <div className="input-">
                            <input className="password-input" type="text" placeholder="Password" value={passwordString}
                                   onInput={event => {
                                       setPasswordString(event.target.value)
                                   }}/>
                            <div className="reliability-label">{reliability}</div>
                        </div>
                        <i className="fa fa-copy" onClick={copyToClipboard}/>
                        <i className="fa fa-save" onClick={e=> {
                            if(AuthService.getUser() === null)  window.location.href = '/sign up'
                            else setSaveClick(true)}
                        }/>
                    </div>
                    <div className="button-wrapper">
                        <button className="generate-button" onClick={generate}>Generate</button>

                    </div>
                </div>
                <div className="generator-setting-container">
                    <div className="generator-setting-length">
                        <div className="setting-length-wrapper">
                            <label><span>Characters used</span>: {sliderLength.value}</label>
                        </div>
                        <div className="slider-settings">
                            <button className="button-circle" onClick={e => updateSlider(Math.max(sliderLength.value - 1, sliderLength.min))}>
                                <i className="fa fa-minus"/>
                            </button>
                            <div className="slider-container">
                                <input type="range" min={sliderLength.min} max={sliderLength.max} className="slider" id="slider"
                                       onInput={event => {
                                           updateSlider(event.target.value)
                                       }}
                                       onClick={event => {
                                           updateSlider(event.target.value)
                                       }}
                                />
                                <div className="slider-border-part"></div>
                            </div>
                            <button className="button-circle" onClick={e=>updateSlider(Math.min(sliderLength.value + 1, sliderLength.max))}>
                                <i className="fa fa-plus"/>
                            </button>
                        </div>
                    </div>
                    <div className="generator-setting-complexity">
                        <div className="complexity-checkbox">
                            <label>abc</label>
                            <input
                                type="checkbox"
                                className="checkbox-input lowercase"
                                checked={checkboxStates.lowercase}
                                onChange={() => handleCheckboxChange('lowercase')}
                            />
                            <label>ABC</label>
                            <input
                                type="checkbox"
                                className="checkbox-input uppercase"
                                checked={checkboxStates.uppercase}
                                onChange={() => handleCheckboxChange('uppercase')}
                            />
                            <label>0-9</label>
                            <input
                                type="checkbox"
                                className="checkbox-input numbers"
                                checked={checkboxStates.numbers}
                                onChange={() => handleCheckboxChange('numbers')}
                            />
                            <label>%-?</label>
                            <input
                                type="checkbox"
                                className="checkbox-input symbols"
                                checked={checkboxStates.symbols}
                                onChange={() => handleCheckboxChange('symbols')}
                            />
                        </div>
                    </div>
                </div>
                <ToastContainer />
                <PasswordSaveForm
                    password={passwordString}
                    isVisible={saveClick}
                    handleCancel={() => {setSaveClick(false)}}/>
            </div>
        );
    }
    export default Generator;