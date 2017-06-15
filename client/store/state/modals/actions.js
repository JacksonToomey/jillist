import { fromJS } from 'immutable';
import * as types from './types';

export const setModalVisibility = (show, modalName) => ({
    type: types.SET_MODAL_VISIBILITY,
    payload: {
        modalName,
        show,
    }
})

export const setModalData = (dataField, dataValue, modalName) => ({
    type: types.SET_MODAL_DATA,
    payload: {
        dataField,
        dataValue,
        modalName,
    }
})

export const setModalErrors = (errors, modalName) => ({
    type: types.SET_MODAL_ERRORS,
    payload: {
        errors: fromJS(errors),
        modalName,
    }
})

export const resetModalData = modalName => ({
    type: types.RESET_MODAL_DATA,
    payload: {
        modalName
    }
})

export const closeNewTaskModal = () => dispatch => {
    dispatch(setModalVisibility(false, 'newTask'));
    dispatch(resetModalData('newTask'));
}