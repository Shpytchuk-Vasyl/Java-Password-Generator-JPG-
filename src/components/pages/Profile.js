import React, {useEffect, useState} from 'react';
import PasswordCard from "../PasswordCard"
import "./Profile.css"
import AuthService from "../../services/auth/AuthService";
import UserService from "../../services/UserService";
import {Button} from "../Button";
import {ToastContainer} from "react-toastify";

function Profile() {



    const [passwordDataArray, setPasswordDataArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (AuthService.getUser() !== null) {
                try {
                    const response = await UserService.getUsersPasswords((s, d) => {});
                    setPasswordDataArray(response || []);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            console.log(passwordDataArray)
        };

        fetchData();
    }, []);

    function generatePasswordCards(dataArray) {
        return dataArray.map((data, index) => (
            <PasswordCard info={data} PasswordDataArray={passwordDataArray} setPasswordDataArray={setPasswordDataArray}/>
        ));
    }



    return (
        <>
            {passwordDataArray.length > 0 ?
            <div className="profile-cards">
                {generatePasswordCards(passwordDataArray)}
            </div>
         :
                <div style={{height: "20rem"}}>
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
             }
             <ToastContainer/>
        </>
    );
}

export default Profile;