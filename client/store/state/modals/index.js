import { Map } from 'immutable';
import * as types from './types';
import State from './records';

export default (state = new State(), action) => {
    switch(action.type) {
        case types.SET_MODAL_VISIBILITY:
            return state.withMutations(s => s.setIn([action.payload.modalName, 'show'], action.payload.show));
        case types.SET_MODAL_DATA:
            return state.withMutations(
                s => s.setIn(
                    [action.payload.modalName, 'data', action.payload.dataField],
                    action.payload.dataValue
                )
            );
        case types.SET_MODAL_ERRORS:
            return state.withMutations(
                s => s.setIn(
                    [action.payload.modalName, 'errors'],
                    action.payload.errors
                )
            );
        case types.RESET_MODAL_DATA:
            return state.withMutations(
                s => s.setIn(
                    [action.payload.modalName, 'data'],
                    Map(),
                )
                .setIn(
                    [action.payload.modalName, 'errors'],
                    Map(),
                )
            )
        default:
            return state;
    }
}