import * as types from './types';
import State from './records';

export default (state = new State(), action) => {
    switch(action.type) {
        case types.SET_ITEMS:
            return state.withMutations(s => {
                let {
                    itemName,
                    items
                } = action.payload
                s.setIn([itemName, 'items'], items)
                .setIn([itemName, 'loaded'], true);
            });
        case types.SET_ITEM:
            return state.withMutations(s => s.setIn([action.payload.itemName, 'items', action.payload.item.get('id')], action.payload.item));
        case types.UPDATE_ITEM:
            return state.withMutations(s => {
                let {
                    itemField,
                    itemValue,
                    itemId,
                    itemName
                } = action.payload;
                return s.setIn([itemName, 'items', itemId, itemField], itemValue);
            })
        default:
            return state;
    }
}