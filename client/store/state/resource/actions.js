import { fromJS, Map } from 'immutable';
import * as types from './types';
import * as api from '../../middleware/api/actions'
import { getDeleteTask } from './selectors';

export const setItems = (items, itemName) => ({
    type: types.SET_ITEMS,
    payload: {
        itemName,
        items: Map(fromJS(items).map(i => [i.get('id'), i])),
    }
})

export const setItem = (item, itemName) => ({
    type: types.SET_ITEM,
    payload: {
        itemName,
        item: fromJS(item),
    }
})

export const updateItem = (itemField, itemValue, itemId, itemName) => ({
    type: types.UPDATE_ITEM,
    payload: {
        itemField,
        itemValue,
        itemId,
        itemName,
    }
})

export const setDeleteItem = (itemId, itemName) => ({
    type: types.SET_DELETE_ITEM,
    payload: {
        itemId,
        itemName,
    }
});

export const clearDeleteItem = itemName => ({
    type: types.CLEAR_DELETE_ITEM,
    payload: {
        itemName,
    }
});

export const deleteItem = (itemId, itemName) => ({
    type: types.DELETE_ITEM,
    payload: {
        itemId,
        itemName,
    }
})

export const deleteTask = () => (dispatch, getState) => {
    let taskId = getDeleteTask(getState());
    dispatch(api.deleteTask(taskId)).catch(e => {}).then(r => {
        dispatch(deleteItem(taskId, 'tasks'));
        dispatch(clearDeleteItem('tasks'));
    });
}