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

import { getTasksLoaded, getSortedTasks } from '../store/state/resource/selectors';

import { setModalVisibility } from '../store/state/modals/actions';
import { completeTask, syncTask } from '../store/state/compoundActions';
import { updateItem } from '../store/state/resource/actions';

import NewTask from './NewTask';

import Task from '../components/Task';
import Loading from '../components/Loading';
import TaskListHeader from '../components/TaskListHeader';


const Comp = ({
    tasks,
    newTaskShow,
    completeTask,
    loaded,
    updateTask,
    sync
}) => {
    let taskList = <div>You have no tasks</div>;
    if(!loaded) {
        taskList = <Loading />
    }
    else if(tasks.size > 0) {
        taskList = (
            <ListGroup>
                {tasks.map((task, key) => (
                    <ListGroupItem key={ key }>
                    <Task
                        onComplete={ completeTask }
                        onUpdate={ updateTask }
                        task={ task }
                        onEdited={() => { sync(task.get('id')) }}/>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
    return (
        <div className="app-tasks-list">
            <TaskListHeader
                onAddClick={ newTaskShow } />
            { taskList }
            <NewTask />
        </div>
    )
}

const mapStateToProps = state => ({
    tasks: getSortedTasks(state),
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
