import React from 'react';
import "./Button.css"
import {Link} from "react-router-dom";

const STYLE = ["btn--primary", "btn--outline"]
const SIZE = ["btn--medium", "btn--large"]
export const Button = ({children, to, type, onClick, buttonStyle, buttonSize}) => {
    const checkStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0]
    const checkSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0]

    return <Link to={to} className="btn-mobile">
        <button className={`btn ${checkStyle} ${checkSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    </Link>
};