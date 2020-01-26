import { makeRequest } from '../../../utility/HttpClient';

export default class FeaturesService {
    public static create(name: string, description: string, selected: boolean, time: Number, cost: Number, icon: string, images: string[], app: string | undefined) {
        return makeRequest('/api/feature', 'POST', null, {name, description, selected, time, cost, icon, images, app});
    }

    public static update(id: string, name: string, description: string, selected: boolean, time: Number, cost: Number, icon: string, images: string[], app: string | undefined) {
        return makeRequest(`/api/feature/${id}`, 'PUT', null, {name, description, selected, time, cost, icon, images, app});
    }

    public static getAll() {
        return makeRequest('/api/feature', 'GET');
    }

    public static delete(id: string) {
        return makeRequest(`/api/feature/${id}`, 'DELETE');
    }

    public static assign(id: string, tags: string[], categories: string[], platforms: string[]) {
        return makeRequest(`/api/feature/${id}/assign`, 'PUT', null, {tags, categories, platforms});
    }
}
