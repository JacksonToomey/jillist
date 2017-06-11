import * as types from './types';
import State from './records';

export default (state = new State(), action) => {
    switch(action.type) {
        case types.SET_ITEMS:
            return state.set(action.paylod.itemName, action.paylod.items);
        default:
            return state;
    }
}