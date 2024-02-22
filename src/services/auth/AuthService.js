import axios from "axios"
import UserService from "../UserService";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/v1/auth/"
class AuthService {
    login(email, password, RequestHandle) {
        this.sign(email, password, RequestHandle,"login")
    }

    sign(email, password, RequestHandle, endPoint) {
        axios.post(API_URL + endPoint, {
            "id": 0,
            "email": email,
            "password": password
        },{headers: AuthHeader()})
            .then(
                resource => {
                    localStorage.setItem("user", JSON.stringify(resource.data))
                    RequestHandle(resource.status, resource.data)
                }
            )
            .catch(error => {UserService.errorHandle(error,RequestHandle)})
    }


    signup(email, password, RequestHandle ) {
        this.sign(email, password, RequestHandle,"signup")
    }


    loginWithGoogle(RequestHandle) {
        //window.location.href = "http://localhost:8080";
        //window.location.href = "http://localhost:8080/oauth2/authorization/google/?redirect_uri=http://localhost:3000/oauth2/callback/";
        RequestHandle(404, "This function not available yet")

        // axios.get("http://localhost:8080/oauth2/authorization/google", {headers: AuthHeader(), withCredentials: true})
        //     .then(
        //         resource => {
        //             if(resource.redirected) console.log(resource,"redirect", resource.redirected);
        //             localStorage.setItem("user", JSON.stringify(resource.data))
        //             RequestHandle(resource.status, resource.data)
        //         }
        //     )
        //     .catch(error => {
        //         if(error.redirected) console.log(error,"redirect", error.redirected);
        //         UserService.errorHandle(error, RequestHandle)
        //     })

    }


    logout() {

        localStorage.removeItem("user")
    }

    getUser() {
        try {
            let info = JSON.parse(localStorage.getItem("user"))
            return info ? null : info.user
        } catch (e) {
            return null;
        }
    }




}

export default new AuthService()