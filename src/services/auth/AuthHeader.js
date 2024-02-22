export default function authHeader() {
    const userAndToken = JSON.parse(localStorage.getItem("user"))
    return userAndToken && userAndToken.jwtToken
        ? {Authorization: "Bearer " + userAndToken.jwtToken,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        : {"Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
}
