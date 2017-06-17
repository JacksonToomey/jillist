import React from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
} from 'react-bootstrap';

import { makeGetShowModal, makeGetModalData, makeGetModalErrors } from '../store/state/modals/selectors';

import { closeNewTaskModal } from '../store/state/modals/actions';
import { setModalData } from '../store/state/modals/actions';
import { createTask } from '../store/state/compoundActions';

import FormWidget from '../components/FormWidget';


const Comp = ({
    show,
    closeModal,
    create,
    setDescription,
    data,
    errors,
    setDueDate,
    setDetails,
}) => {
    return (
        <Modal autoFocus className="new-task" show={ show }>
            <Modal.Header
                onHide={ closeModal }
                closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormWidget
                        name="description"
                        label="Title"
                        value={ data.get('description') }
                        onChange={ setDescription }
                        errors={ errors.get('description') }
                        />
                    <FormWidget
                        name="details"
                        label="Description"
                        type="textarea"
                        value={ data.get('details') }
                        onChange={ setDetails }
                        errors={ errors.get('details') }
                        />
                    <FormWidget
                        name="duedate"
                        label="Task due date"
                        type="datetime"
                        onChange={ setDueDate }
                        value={ data.get('duedate') }
                        errors={ errors.get('duedate') }
                        />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ closeModal }>Close</Button>
                <Button bsStyle="primary" onClick={ create }>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

const getShowModal = makeGetShowModal('newTask');
const getModalData = makeGetModalData('newTask');
const getModalErrors = makeGetModalErrors('newTask');

const mapStateToProps = state => ({
    show: getShowModal(state),
    data: getModalData(state),
    errors: getModalErrors(state),
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => {
        dispatch(closeNewTaskModal());
    },
    create: () => {
        dispatch(createTask());
    },
    setDescription: value => {
        dispatch(setModalData('description', value, 'newTask'))
    },
    setDueDate: value => {
        dispatch(setModalData('duedate', value, 'newTask'));
    },
    setDetails: value => {
        dispatch(setModalData('details', value, 'newTask'));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
