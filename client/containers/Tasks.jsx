import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Modal, Button, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';

import { getSortedTasks } from '../store/state/resource/selectors';

import Task from '../components/Task';
import TaskListHeader from '../components/TaskListHeader';


const Comp = ({
    tasks
}) => {
    return (
        <div className="app-tasks-list">
            <TaskListHeader
                onAddClick={e => { console.log(e); }} />
            {tasks.map((task, key) => <Task task={ task } key={ key } />)}
        </div>
    )
}

const mapStateToProps = state => ({
    tasks: getSortedTasks(state),
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
