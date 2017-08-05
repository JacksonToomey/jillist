import { createSelector } from 'reselect';

export const getUsage = ({ stats }) => stats.get('usage');