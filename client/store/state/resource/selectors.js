import { createSelector } from 'reselect';

export const getTasks = ({ resource }) => resource.get('tasks').get('items');
export const getTasksLoaded = ({ resource }) => resource.get('tasks').get('loaded');

export const getCompleteTasks = createSelector(
    [getTasks],
    tasks => tasks.filter(t => t.get('closed'))
)

export const getOpenTasks = createSelector(
    [getTasks],
    tasks => tasks.filter(t => !t.get('closed'))
)


const makeGetSortedTasks = taskSelector => createSelector(
    [taskSelector],
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

export const getSortedOpenTasks = makeGetSortedTasks(getOpenTasks);
export const getSortedCompleteTasks = makeGetSortedTasks(getCompleteTasks);

export const getSortedTasks = createSelector(
    [getSortedOpenTasks, getSortedCompleteTasks],
    (openTasks, completeTasks) => openTasks.concat(completeTasks)
)