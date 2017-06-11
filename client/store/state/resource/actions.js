import { fromJS } from 'immutable';
import * as types from './types';

export const setItems = (items, itemName) => ({
    type: types.SET_ITEMS,
    payload: {
        itemName,
        items: fromJS(items),
    }
})