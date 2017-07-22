import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import {
    clearDeleteItem,
    deleteTask,
} from '../store/state/resource/actions';

import { getHasDeleteTask } from '../store/state/resource/selectors';


const Comp = ({
    show,
    noAction,
    yesAction
}) => {
    console.log(show);
    return (
        <Modal autoFocus show={ show }>
            <Modal.Header>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this task?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ yesAction }>Yes</Button>
                <Button bsStyle="primary" onClick={ noAction }>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => ({
    show: getHasDeleteTask(state),
});

const mapDispatchToProps = dispatch => ({
    noAction: () => {
        dispatch(clearDeleteItem('tasks'));
    },
    yesAction: () => {
        dispatch(deleteTask());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);