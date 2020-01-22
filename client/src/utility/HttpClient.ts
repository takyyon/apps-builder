import axios, { Method } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const makeRequest = (url: string, method: Method, parameters?: any, body?:any) => {
    
    return axios.request({
        url: url,
        method: method,
        data: body,
        validateStatus: () => true,
    });
};