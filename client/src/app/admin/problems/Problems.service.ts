import { makeRequest } from '../../../utility/HttpClient';

export default class ProblemsService {
    public static create(name: string, description: string, icon: string) {
        return makeRequest('/api/problem', 'POST', null, {name, description, icon});
    }

    public static update(id: string, name: string, description: string, icon: string) {
        return makeRequest(`/api/problem/${id}`, 'PUT', null, {name, description, icon});
    }

    public static getAll() {
        return makeRequest('/api/problem', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`/api/problem/${id}`, 'DELETE');
    }
}
