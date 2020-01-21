import { makeRequest } from './../../../utility/HttpClient';

export default class CategoriesService {
    public static create(name: string, description: string, icon: string) {
        return makeRequest('/api/category', 'POST', null, {name, description, icon});
    }

    public static update(id: string, name: string, description: string, icon: string) {
        return makeRequest(`/api/category/${id}`, 'PUT', null, {name, description, icon});
    }

    public static getAll() {
        return makeRequest('/api/category', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`/api/category/${id}`, 'DELETE');
    }
}
