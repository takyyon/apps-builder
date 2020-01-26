import axios, { Method } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const makeRequest = (url: string, method: Method, parameters?: any, body?:any, auth?: boolean) => {
    const headers = {};
    if(auth) {
        const token = getToken();
        if(!!token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return axios.request({
        headers,
        url,
        method,
        data: body,
        validateStatus: () => true,
    });
};

export const getToken = () => {
    return localStorage.getItem("user_token");
};
