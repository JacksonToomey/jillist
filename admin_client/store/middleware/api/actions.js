import * as types from './types';

export const fetchUsage = () => ({
    type: types.FETCH_USAGE,
});

export const fetchTotals = () => ({
    type: types.FETCH_TOTAL,
});
