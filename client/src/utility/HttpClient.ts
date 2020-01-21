import axios, { Method } from 'axios';

export const makeRequest = (url: string, method: Method, parameters?: any, body?:any) => {
    if(!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `http://localhost:5000/${url}`;
    }
    return axios.request({
        url: url,
        method: method,
        data: body,
        validateStatus: () => true,
    });
};