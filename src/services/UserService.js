import axios from "axios"
import AuthService from "./auth/AuthService";
import AuthHeader from "./auth/AuthHeader";

const API_URL = "http://localhost:8080/api/v1/"
class UserService {

    errorHandle = (error, handleResponse) => {
        let msg = this.userIsNotAuthorized(error.response ? error.response.status : 500, error.response)
        if(msg === null) msg = error.message
        handleResponse(error.response ? error.response.status : 500 , msg);
        console.log(error)
    }

    generatePassword(symbols, size, handleResponse) {

        axios.get(API_URL+ "passwords/generate/",{ params: {
                "uppercase": symbols.uppercase,
                "lowercase": symbols.lowercase,
                "numbers": symbols.numbers,
                "symbols": symbols.symbols,
                "size" : size.size} })
            .then(resource => {
                console.log(resource)
                handleResponse(resource.status, resource.data);
            })
            .catch(error => {this.errorHandle(error, handleResponse)})


    }

    saveUserPassword(password, handleResponse) {
        axios.post(API_URL+ "passwords/", password ,{headers: AuthHeader()})
            .then(resource => {
                    handleResponse(resource.status, resource.data);
            })
            .catch(error => {this.errorHandle(error,handleResponse)})
    }

    editUserPassword(password, handleResponse) {
        axios.put(API_URL+ "passwords/", password,{headers: AuthHeader()})
            .then(resource => {
                    handleResponse(resource.status, resource.data);
                console.log(resource)

            })
            .catch(error => {this.errorHandle(error,handleResponse)})
    }

    deleteUserPassword(password, handleResponse) {
        axios.delete(API_URL+ "passwords/" + password.id,{headers: AuthHeader(), data: password})
            .then(resource => {
                handleResponse(resource.status, resource.data);
                console.log(resource)
            })
            .catch(error => {this.errorHandle(error,handleResponse)})
    }

    getUsersPasswords(handleResponse) {
        return axios.get(API_URL+ "passwords/" + AuthService.getUser().id, {headers: AuthHeader()} )
            .then(resource => {
                    handleResponse(resource.status, resource.data);
                console.log(resource)
                return resource.data
            })
            .catch(error => {this.errorHandle(error,handleResponse)})
    }


    userIsNotAuthorized = (status, response) => {
        if(status === 401) {
            AuthService.logout()
            return "User is not authorized"
        } else if(status === 400) {
            return response.data
        }
        return null
    }


    validUserData(email, password1, password2) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordNotEmpty = password1.trim() !== '';
        const doPasswordsMatch = password1 === password2;
        const isPasswordGreater8 = password1.length >= 8;
        return {
            isPasswordGreater8,
            isEmailValid,
            isPasswordNotEmpty,
            doPasswordsMatch,
        };
    }


}

export default new UserService()