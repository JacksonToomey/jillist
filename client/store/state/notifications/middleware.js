import * as types from './types';
import { clearNotification } from './actions';

export default store => next => action => {
    let result = next(action);
    if(action.type == types.ADD_NOTIFICATION) {
        setTimeout(() => {
            let id = action.payload.notification.get('id')
            store.dispatch(clearNotification(id));
        }, 3000)
    }
    return result;
}