import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/auth/"
class AuthService {
    login(email, password, RequestHandle) {
        this.sign(email, password, RequestHandle,"login")
    }

    sign(email, password, RequestHandle, endPoint) {
        axios.post(API_URL + endPoint, {
            "email": email,
            "password": password
        })
            .then(
                resource => {
                    localStorage.setItem("user", JSON.stringify(resource.data))
                    RequestHandle(resource.status, resource.data)
                }
            )
    }


    signup(email, password, RequestHandle ) {
        this.sign(email, password, RequestHandle,"signup")
    }

    logout() {

        localStorage.removeItem("user")
    }

    getUser() {
        //localStorage.setItem("user", null)
        let info = JSON.parse(localStorage.getItem("user"))
        return info === null ? null : info.user
    }

}

export default new AuthService()