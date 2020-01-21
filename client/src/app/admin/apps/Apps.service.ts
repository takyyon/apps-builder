import { makeRequest } from '../../../utility/HttpClient';

export default class AppsService {
    public static create(name: string, description: string, icon: string, images: string[]) {
        return makeRequest('api/app', 'POST', null, {name, description, icon, images});
    }

    public static update(id: string, name: string, description: string, icon: string, images: string[]) {
        return makeRequest(`api/app/${id}`, 'PUT', null, {name, description, icon, images});
    }

    public static getAll() {
        return makeRequest('api/app', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`api/app/${id}`, 'DELETE');
    }

    public static assign(id: string, tags: string[], categories: string[], platforms: string[], problems: string[]) {
        return makeRequest(`api/app/${id}/assign`, 'PUT', null, {tags, categories, platforms, problems});
    }
}
