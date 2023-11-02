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

const handleEditParentService = (data) => {
    let access_token = getAccessToken()
    return axios.post(`v1/admins/change-info/${data['id']}`,
    {"fullName": data['fullName'], "password": data['password']},
    { 
        headers: {
            'Authorization' : `Bearer ${access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

const handleBlockParentService = (parentID) => {
    let access_token = getAccessToken()
    return axios.post(`v1/admins/block/${parentID}`,
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

const handleRegisterNewAccountService = (val) => {
    return axios.post('v1/parents/register',
        {'email': val['email'], 'fullname': val['fullName'], 'password': val['password']}
    )
}

export {handleParentInfo, handleEditParentService, handleBlockParentService, handleRegisterNewAccountService}