import { create } from 'axios';

import API_ROUTES from '../configs/api.routes';

const api = create({
    baseURL: process.env.REACT_APP_URL
});

const apiService = {
    get(route) {
        return api.get(API_ROUTES[route]);
    }
};
export default apiService;