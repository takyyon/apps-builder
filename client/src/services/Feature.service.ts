import { makeRequest } from "../utility/HttpClient";

export default class FeatureService {
    public static getAll() {
        return makeRequest('api/feature', 'GET');
    }
}