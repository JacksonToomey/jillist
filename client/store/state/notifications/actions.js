import { fromJS } from 'immutable';
import * as types from './types';

export const removeNotification = id => ({
    type: types.REMOVE_NOTIFICATION,
    payload: {
        id,
    }
});

export const addNotification = (message, type) => ({
    type: types.ADD_NOTIFICATION,
    payload: {
        notification: fromJS({
            message,
            type,
            removed: false,
            id: Math.floor(Date.now())
        }),
    }
})


export const setNotificationRemoved = id => ({
    type: types.SET_NOTIFICATION_REMOVED,
    payload: {
        id
    }
})

const makeAddNotification = type => message => addNotification(message, type);

export const addSuccess = makeAddNotification('success');

export const clearNotification = id => (dispatch, getState) => {
    let notifications = getState().notifications;
    if(!notifications.has(id)) {
        return
    }
    dispatch(setNotificationRemoved(id));
    setTimeout(() => {
        dispatch(removeNotification(id));
    }, 1000)
}
