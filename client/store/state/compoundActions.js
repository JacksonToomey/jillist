import { postTask, putTask } from '../middleware/api/actions';
import { closeNewTaskModal, setModalErrors } from './modals/actions';
import { setItem } from './resource/actions';

import { makeGetModalData } from './modals/selectors';
import { getTasks } from './resource/selectors';

const getModalData = makeGetModalData('newTask');

export const createTask = () => (dispatch, getState) => {
    let taskData = getModalData(getState());
    dispatch(postTask(taskData))
    .then(resp => {
        dispatch(setItem(resp.data, 'tasks'));
        dispatch(closeNewTaskModal());
    })
    .catch(err => {
        dispatch(setModalErrors(err.response.data, 'newTask'))
    })
}

export const completeTask = taskId => (dispatch, getState) => {
    let task = getTasks(getState()).get(taskId);
    task = task.set('closed', true);
    dispatch(putTask(task)).then(resp => {
        dispatch(setItem(resp.data, 'tasks'));
    })
}

export const syncTask = taskId => (dispatch, getState) => {
    let task = getTasks(getState()).get(taskId);
    dispatch(putTask(task)).then(resp => {
        dispatch(setItem(resp.data, 'tasks'))
    })
}