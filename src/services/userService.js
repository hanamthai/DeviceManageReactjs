import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/v1/logins',{"email":email,"password":password})
}

const handleUserInfo = () => {
    let localStoreObj = JSON.parse(localStorage.getItem('persist:user'))
    let userInfoJson = localStoreObj.userInfo
    let access_token = JSON.parse(userInfoJson).access_token
    return axios.get('v1/parents/child-info', { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }})
}

export { handleLogin, handleUserInfo }