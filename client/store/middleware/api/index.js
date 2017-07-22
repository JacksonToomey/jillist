import requests from 'axios';
import * as types from './types';


const fetchTasks = () => {
    return requests.get('/api/tasks/')
}

const postTask = taskData => {
    return requests.post('/api/tasks/', taskData)
}

const putTask = task => {
    return requests.put('/api/tasks/' + task.get('id') + '/', task);
}

const deleteTask = taskId => {
    return requests.delete('/api/tasks/' + taskId + '/');
}

export default store => next => action => {
    switch(action.type) {
        case types.GET_TASKS:
            return fetchTasks();
        case types.POST_TASK:
            return postTask(action.payload.taskData);
        case types.PUT_TASK:
            return putTask(action.payload.task);
        case types.DELETE_TASK:
            return deleteTask(action.payload.taskId);
        default:
            return next(action);
    }
}