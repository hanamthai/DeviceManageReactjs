import axios from "../axios"

const getAccessToken = () => {
    let localStoreObj = JSON.parse(localStorage.getItem('persist:user'))
    let userInfoJson = localStoreObj.userInfo
    let access_token = JSON.parse(userInfoJson).access_token
    return access_token
}

const handleLogin = (email, password) => {
    return axios.post('/v1/logins',{"email":email,"password":password})
}

const handleUserInfo = () => {
    let access_token = getAccessToken()
    return axios.get('v1/parents/child-info', 
        { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }}
    )
}

const handleCreateNewUserService = (val) => {
    let access_token = getAccessToken()
    return axios.post('v1/parents/register-child',
        {'email': val['email'], 'fullname': val['fullName'], 'password': val['password']},
        { 
            headers: {
                'Authorization' : `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )
}

const handleBlockUserService = (childID) => {
    let access_token = getAccessToken()
    return axios.post(`v1/parents/block/${childID}`,
        {},
        { 
            headers: {
                'Authorization' : `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )
}

const handleEditUserService = (data) => {
    let access_token = getAccessToken()
    return axios.post(`v1/parents/edit-child/${data['id']}`,
    {"fullName": data['fullName'], "password": data['password']},
    { 
        headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

const handleGetWebHistory = (childID, deviceID, day) => {
    let access_token = getAccessToken()
    return axios.get(`v1/parents/web-history/${childID}/${deviceID}/${day}`,
        { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }}
    )
}

const handleGetKeyboardLog = (childID, deviceID, day) => {
    let access_token = getAccessToken()
    return axios.get(`v1/parents/keyboard-log/${childID}/${deviceID}/${day}`,
        { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }}
    )
}

const handleTopWebHistory = (childID) => {
    let access_token = getAccessToken()
    return axios.get(`v1/parents/top-visit-web/${childID}`,
        { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }}
    )
}

export { 
    handleLogin, 
    handleUserInfo, 
    handleCreateNewUserService, 
    handleBlockUserService,
    handleEditUserService,
    handleGetWebHistory,
    handleGetKeyboardLog,
    handleTopWebHistory
}