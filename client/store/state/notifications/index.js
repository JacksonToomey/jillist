import { fromJS } from 'immutable';
import * as types from './types';


export default (state = new fromJS({}), action) => {
    switch(action.type) {
        case types.REMOVE_NOTIFICATION:
            return state.withMutations(s => {
                return s.delete(action.payload.id);
            })
        case types.ADD_NOTIFICATION:
            return state.withMutations(s => {
                return s.set(action.payload.notification.get('id'), action.payload.notification);
            });
        case types.SET_NOTIFICATION_REMOVED:
            return state.withMutations(s => {
                let id = action.payload.id
                return s.setIn([id, 'removed'], true);
            })
        default:
            return state;
    }
}