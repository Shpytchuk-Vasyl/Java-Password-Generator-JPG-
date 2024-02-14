import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/auth/"
class AuthService {
    login(username, password, badRequestHandle) {
        return axios.post(API_URL + "login", {username,password}).then(
            resource => {
                if(resource.status === 200) {
                    localStorage.setItem("user", resource.data)
                } else {
                    badRequestHandle(resource.status, resource.data)
                }
                return resource.data
            }
        )
    }


    signup(username, password, badRequestHandle ) {
        return axios.post(API_URL + "signup", {username,password}).then(
            resource => {
                if(resource.status === 200) {
                    localStorage.setItem("user", resource.data)
                } else {
                    badRequestHandle(resource.status, resource.data)
                }
                return resource.data
            }
        )
    }

    logout() {
        localStorage.removeItem("user")
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user")).user
    }

}

export default new AuthService()