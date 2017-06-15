import { createSelector } from 'reselect';

export const getTasks = ({ resource }) => resource.get('tasks').get('items');

export const getSortedTasks = createSelector(
    [getTasks],
    tasks => tasks.toList().sortBy(t => t.get('duedate'), (first, second) => {
        if(first > second) {
            return -1;
        }
        else if(second > first) {
            return 1;
        }

        return 0;
    })
)