import { makeRequest } from '../../../utility/HttpClient';

export default class TagsService {
    public static create(name: string, description: string, icon: string) {
        return makeRequest('/api/tag', 'POST', null, {name, description, icon});
    }

    public static update(id: string, name: string, description: string, icon: string) {
        return makeRequest(`/api/tag/${id}`, 'PUT', null, {name, description, icon});
    }

    public static getAll() {
        return makeRequest('/api/tag', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`/api/tag/${id}`, 'DELETE');
    }
}
