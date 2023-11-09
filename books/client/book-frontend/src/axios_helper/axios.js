import axios from 'axios';


axios.defaults.baseURL = 'https://localhost:7158';

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};


export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    console.log(url)

    return axios({
        method: method,
        url: url,
        headers: headers,
        params : {id : data},    
       
    });
};