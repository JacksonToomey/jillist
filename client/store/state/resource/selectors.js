import { createSelector } from 'reselect';

export const getTasks = ({ resource }) => resource.get('tasks').get('items');

export const getSortedTasks = createSelector(
    [getTasks],
    tasks => tasks.toList()
)