import requests from 'axios';
import * as types from './types';


const fetchTasks = () => {
    return requests.get('/api/tasks/')
}

export default store => next => action => {
    switch(action.type) {
        case types.GET_TASKS:
            return fetchTasks();
        default:
            return next(action);
    }
}