import React, {useState} from 'react';
import "./PasswordCard.css"
const PasswordCard = ({ _name, _password, onEdit, onDelete }) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(_name);
    const [password, setPassword] = useState(_password);

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
                <input className="name" type="text" readOnly={!edit} value={name} onInput={event =>{setName(event.target.value);} }/>
                <input className="password" type={passwordShown ? "text" : "password"} readOnly={!edit} value={password} onInput={event =>{setPassword(event.target.value);}}/>
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
