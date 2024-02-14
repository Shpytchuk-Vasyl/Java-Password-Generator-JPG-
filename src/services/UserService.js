import axios from "axios"
import AuthService from "./auth/AuthService";
import AuthHeader from "./auth/AuthHeader";

const API_URL = "http://localhost:8080/api/v1/"
class UserService {

    generatePassword(symbols, length, handleResponse) {
        axios.get(API_URL+ "passwords/", {symbols, length})
            .then(resource => {
                    handleResponse(resource.status, resource.data);
            })
    }

    saveUserPassword(password, handleResponse) {
        axios.post(API_URL+ "passwords/", { password },{headers: AuthHeader()})
            .then(resource => {
                    handleResponse(resource.status, resource.data);
            })
    }

    editUserPassword(password, handleResponse) {
        axios.put(API_URL+ "passwords/", { password },{headers: AuthHeader()})
            .then(resource => {
                    handleResponse(resource.status, resource.data);
            })
    }

    deleteUserPassword(password, handleResponse) {
        axios.delete(API_URL+ "passwords/" + password.id,{headers: AuthHeader()})
            .then(resource => {
                handleResponse(resource.status, resource.data);
            })
    }

    getUsersPasswords(handleResponse) {
        axios.get(API_URL+ "passwords/" + AuthService.getUser().id, {headers: AuthHeader(), params: AuthService.getUser()} )
            .then(resource => {
                    handleResponse(resource.status, resource.data);
            })
    }


    validUserData(email, password1, password2) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordNotEmpty = password1.trim() !== '';
        const doPasswordsMatch = password1 === password2;

        return {
            isEmailValid,
            isPasswordNotEmpty,
            doPasswordsMatch,
        };
    }


}

export default new UserService()