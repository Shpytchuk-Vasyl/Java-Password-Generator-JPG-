import React, {useState} from 'react';
import "./Generator.css"
function Generator() {
    const [reliability,setReliability] = useState("very strong")
    const [passwordLength,setPasswordLength] = useState(50)
    return (
        <div className="generator-container" id="generator-container">
            <h1>Java Password Generator</h1>
            <p>Create strong and secure passwords to keep your account safe online.</p>
            <div className="input-container">
                <div className="input-controler">
                    <div className="input-">
                        <input className="password-input" readOnly/>
                        <label className="reliability-label">{reliability}</label>
                    </div>
                    <i className="fa fa-copy"/>
                </div>
                <div className="button-wrapper">
                    <button className="generate-button">Generate</button>
                </div>
            </div>
            <div className="generator-setting-container">
                <div className="generator-setting-length">
                    <div className="setting-length-wrapper">
                        <label><span>Characters used</span>: {passwordLength}</label>
                    </div>
                    <div className="slider-settings">
                        <button className="button-circle">
                            <i className="fa fa-minus"/>
                        </button>
                        <div className="slider-container">
                            <input type="range" min="1" max="50" className="slider"
                                  onInput={event => {{
                                      var value = (event.target.value-event.target.min)/(event.target.max-event.target.min)*100
                                      event.target.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
                                      setPasswordLength(event.target.value)
                                  }}}
                                />
                            <div className="slider-border-part"
                                 //style="--slider-border-part-width: 28.571428571428573%;"
                            ></div>
                        </div>
                        <button className="button-circle">
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
                <div className="generator-setting-complexity">
                    <div className="complexity-checkbox">
                        <label>abc</label>
                        <input type="checkbox" className="checkbox-input lowercase"/>
                        <label>ABC</label>
                        <input type="checkbox" className="checkbox-input upperrcase"/>
                        <label>0-9</label>
                        <input type="checkbox" className="checkbox-input numbers"/>
                        <label>%-?</label>
                        <input type="checkbox" className="checkbox-input symbols"/>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Generator;