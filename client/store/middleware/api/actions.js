import * as types from './types';

export const getTasks = () => ({
    type: types.GET_TASKS
});

export const postTask = taskData => ({
    type: types.POST_TASK,
    payload: {
        taskData
    }
})

export const putTask = task => ({
    type: types.PUT_TASK,
    payload: {
        task
    }
})