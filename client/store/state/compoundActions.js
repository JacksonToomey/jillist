import { postTask } from '../middleware/api/actions';
import { closeNewTaskModal, setModalErrors } from './modals/actions';
import { setItem } from './resource/actions';

import { makeGetModalData } from './modals/selectors';

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
    // dispatch(closeNewTaskModal());
}