import React, {useState} from 'react';
import "./PasswordCard.css"
import UserService from "../services/UserService";
import {toast} from "react-toastify";
const PasswordCard = ({info}) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(info.name);
    const [password, setPassword] = useState(info.password);
    const [isVisible,setVisible] = useState(true)
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    function handleEditClick() {
        if(edit) {
            info.name = name
            info.password = password
            UserService.editUserPassword(info, (status, data) => {
                console.log(status,data)
                toast(data, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type : status === 200 ? "success" : "error"
                    });
                setEdit(false)
                })

        } else {
            setEdit(true)
        }
    }

    function handleDeleteClick() {
        if(edit) {
            setEdit(false)
        } else {
            UserService.deleteUserPassword(info
                , (status, data) => {
                    toast(data, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type : status === 200 ? "success" : "error"
                    });
                    console.log(status,data)
                    setVisible(false)
                })
        }
    }

    return (
        <>
            {isVisible &&
        <div className="password-card">
            <div className="password-card-info">
                <input className="name" type="text" readOnly={!edit} value={name} placeholder="Name"
                       onInput={event =>{setName(event.target.value);} }/>
                <input className="password" type={passwordShown ? "text" : "password"} readOnly={!edit} placeholder="Password"
                       value={password} onInput={event =>{setPassword(event.target.value);}}/>
            </div>
            <div className="password-card-actions">
                <button onClick={togglePassword}>
                    <i className={`fa ${!passwordShown ? 'fa-eye-slash' : 'fa-eye'}`}/>
                </button>
                <button onClick={handleEditClick}>
                    <i className={!edit ? "fa fa-edit" : "fa fa-check"}/>
                </button>
                <button onClick={handleDeleteClick}>
                    <i className={!edit ? "fa fa-trash" : "fa fa-times"}/>
                </button>
            </div>
        </div>}
        </>
    );
};

export default PasswordCard;
