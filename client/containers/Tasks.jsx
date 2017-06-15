import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Modal, Button, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';

import { getTasksLoaded, getSortedTasks } from '../store/state/resource/selectors';

import { setModalVisibility } from '../store/state/modals/actions';
import { completeTask } from '../store/state/compoundActions';

import NewTask from './NewTask';

import Task from '../components/Task';
import Loading from '../components/Loading';
import TaskListHeader from '../components/TaskListHeader';


const Comp = ({
    tasks,
    newTaskShow,
    completeTask,
    loaded,
}) => {
    let taskList = <div>You have no tasks</div>;
    if(!loaded) {
        taskList = <Loading />
    }
    else if(tasks.size > 0) {
        taskList = tasks.map((task, key) => <Task
            onComplete={ completeTask }
            task={ task }
            key={ key } />
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
