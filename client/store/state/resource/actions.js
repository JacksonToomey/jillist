import { fromJS, Map } from 'immutable';
import * as types from './types';

export const setItems = (items, itemName) => ({
    type: types.SET_ITEMS,
    payload: {
        itemName,
        items: Map(fromJS(items).map(i => [i.get('id'), i])),
    }
})