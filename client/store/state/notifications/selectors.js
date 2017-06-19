import { createSelector } from 'reselect';

const getNotifications = ({ notifications }) => notifications

export const getSortedNotifications = createSelector(
    [getNotifications],
    notifications => notifications.toList().sortBy(n => n.get('id'))
)