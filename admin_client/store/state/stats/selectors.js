import { createSelector } from 'reselect';

export const getUsage = ({ stats }) => stats.get('usage');

export const getTotals = ({ stats }) => stats.get('totals');