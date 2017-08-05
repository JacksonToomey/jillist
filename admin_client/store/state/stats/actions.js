import { fromJS } from 'immutable';
import * as types from './types';

export const setStat = (statName, data) => ({
    type: types.SET_STAT,
    payload: {
        statName,
        data: fromJS(data),
    }
})