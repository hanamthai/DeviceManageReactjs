import axios from '../axios';

const getAccessToken = () => {
    let localStoreObj = JSON.parse(localStorage.getItem('persist:user'))
    let userInfoJson = localStoreObj.userInfo
    let access_token = JSON.parse(userInfoJson).access_token
    return access_token
}

const handleParentInfo = () => {
    let access_token = getAccessToken()
    return axios.get('v1/admins', 
        { headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${access_token}` }}
    )
}

export {handleParentInfo}