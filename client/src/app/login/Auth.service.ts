import { makeRequest } from "../../utility/HttpClient";

export default class AuthService {
    public static login(email: string, password: string) {
        return makeRequest('api/login', 'POST', null, {email, password});
    }

    public static getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("user_token");
    };

    public static setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("user_token", idToken);
    };

    public static logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("user_token");
        localStorage.removeItem('user');
    };
}