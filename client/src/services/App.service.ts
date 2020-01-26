import { makeRequest } from "../utility/HttpClient";

export default class AppService {
    public static getAll() {
        return makeRequest('api/app', 'GET');
    }
}