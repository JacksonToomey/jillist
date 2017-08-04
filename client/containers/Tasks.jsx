import React from 'react';
import { connect } from 'react-redux';
import {
    Navbar,
    Modal,
    Button,
    FormGroup,
    FormControl,
    Form,
    ControlLabel,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

import { getTasksLoaded, getSortedOpenTasks, getSortedCompleteTasks } from '../store/state/resource/selectors';

import { setModalVisibility } from '../store/state/modals/actions';
import { completeTask, syncTask } from '../store/state/compoundActions';
import {
    updateItem,
    setDeleteItem,
} from '../store/state/resource/actions';

import NewTask from './NewTask';
import DeleteItemModal from './DeleteItemModal';

import Task from '../components/Task';
import Loading from '../components/Loading';
import ListHeader from '../components/ListHeader';
import TaskListHeader from '../components/TaskListHeader';


const Comp = ({
    tasks,
    newTaskShow,
    completeTask,
    loaded,
    updateTask,
    deleteTask,
    completedTasks,
    sync,
}) => {
    let taskList = <div>You have no tasks</div>;
    if(!loaded) {
        taskList = <Loading />
    }
    else if(tasks.size > 0 || completedTasks.size > 0) {
        taskList = (
            <div>
            <h4>Open</h4>
            <ListHeader />
            <ListGroup>
                {tasks.map((task, key) => (
                    <ListGroupItem key={ key }>
                    <Task
                        onComplete={ completeTask }
                        onUpdate={ updateTask }
                        task={ task }
                        onEdited={() => { sync(task.get('id')) }}
                        onDeleted={ deleteTask }/>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <h4>Complete</h4>
            <ListGroup>
                {completedTasks.map((task, key) => (
                    <ListGroupItem key={ key }>
                    <Task
                        onComplete={ completeTask }
                        onUpdate={ updateTask }
                        task={ task }
                        onEdited={() => { sync(task.get('id')) }}
                        onDeleted={ deleteTask }/>
                    </ListGroupItem>
                ))}
            </ListGroup>
            </div>
        )
    }
    return (
        <div className="app-tasks-list">
            <TaskListHeader
                onAddClick={ newTaskShow } />
            { taskList }
            <NewTask />
            <DeleteItemModal />
        </div>
    )
}

const mapStateToProps = state => ({
    tasks: getSortedOpenTasks(state),
    completedTasks: getSortedCompleteTasks(state),
    loaded: getTasksLoaded(state),
})

const mapDispatchToProps = dispatch => ({
    newTaskShow: () => {
        dispatch(setModalVisibility(true, 'newTask'));
    },
    completeTask: taskId => {
        dispatch(completeTask(taskId));
    },
    updateTask: (itemField, itemValue, itemId) => {
        dispatch(updateItem(itemField, itemValue, itemId, 'tasks'));
    },
    sync: taskId => {
        dispatch(syncTask(taskId));
    },
    deleteTask: taskId => {
        dispatch(setDeleteItem(taskId, 'tasks'));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
