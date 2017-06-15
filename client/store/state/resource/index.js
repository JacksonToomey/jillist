import * as types from './types';
import State from './records';

export default (state = new State(), action) => {
    switch(action.type) {
        case types.SET_ITEMS:
            return state.setIn([action.payload.itemName, 'items'], action.payload.items);
        case types.SET_ITEM:
            return state.setIn([action.payload.itemName, 'items', action.payload.item.get('id')], action.payload.item);
        default:
            return state;
    }
}