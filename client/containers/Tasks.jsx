import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Modal, Button, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';

import { getSortedTasks } from '../store/state/resource/selectors';

import { setModalVisibility } from '../store/state/modals/actions';
import { completeTask } from '../store/state/compoundActions';

import NewTask from './NewTask';

import Task from '../components/Task';
import TaskListHeader from '../components/TaskListHeader';


const Comp = ({
    tasks,
    newTaskShow,
    completeTask,
}) => {
    return (
        <div className="app-tasks-list">
            <TaskListHeader
                onAddClick={ newTaskShow } />
            {tasks.map((task, key) => <Task
                onComplete={ completeTask }
                task={ task }
                key={ key } />
            )}
            <NewTask />
        </div>
    )
}

const mapStateToProps = state => ({
    tasks: getSortedTasks(state),
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
