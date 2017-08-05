import requests from 'axios';
import * as types from './types';


const fetchUsage = () => requests.get('/api/admin/usage/');

const fetchTotals = () => requests.get('/api/admin/row_counts/');

export default store => next => action => {
    switch(action.type) {
        case types.FETCH_USAGE:
            return fetchUsage();
        case types.FETCH_TOTAL:
            return fetchTotals();
        default:
            return next(action);
    }
}