import { Map } from 'immutable';
import * as types from './types';


export default (state = new Map(), action) => {
    switch(action.type) {
        case types.SET_STAT:
            return state.withMutations(s => {
                let { statName, data } = action.payload;
                return s.set(statName, data);
            })
        default:
            return state;
    }
}