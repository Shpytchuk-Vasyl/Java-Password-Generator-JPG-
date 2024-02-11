import React, {useState} from 'react';
import "./PasswordCard.css"
const PasswordCard = ({ name, password, onEdit, onDelete }) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [edit, setEdit] = useState(false);
    // Password toggle handler

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    function handleEditClick() {
        if(edit) {
            onEdit()
        } else {
            setEdit(true)
        }
    }

    function handleDeleteClick() {
        if(edit) {
            setEdit(false)
        } else {
            onDelete()
        }
    }

    return (
        <div className="password-card">
            <div className="password-card-info">
                <input className="name" type="text" readOnly={!edit} value={name}/>
                <input className="password" type={passwordShown ? "text" : "password"} readOnly={!edit} value={password}/>
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
        </div>
    );
};

export default PasswordCard;
