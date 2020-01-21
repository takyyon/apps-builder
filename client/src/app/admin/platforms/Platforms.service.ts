import { makeRequest } from '../../../utility/HttpClient';

export default class PlatformsService {
    public static create(name: string, description: string, icon: string) {
        return makeRequest('/api/platform', 'POST', null, {name, description, icon});
    }

    public static update(id: string, name: string, description: string, icon: string) {
        return makeRequest(`/api/platform/${id}`, 'PUT', null, {name, description, icon});
    }

    public static getAll() {
        return makeRequest('/api/platform', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`/api/platform/${id}`, 'DELETE');
    }
}
