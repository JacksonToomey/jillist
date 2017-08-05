import requests from 'axios';
import * as types from './types';


const fetchUsage = () => {
    return requests.get('/api/admin/usage/')
}

export default store => next => action => {
    switch(action.type) {
        case types.FETCH_USAGE:
            return fetchUsage();
        default:
            return next(action);
    }
}