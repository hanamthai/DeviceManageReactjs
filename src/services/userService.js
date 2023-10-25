import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/v1/logins',{"email":email,"password":password})
}

export { handleLogin }