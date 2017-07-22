import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';


const TaskControlGroup = ({
    task,
    onComplete,
    onDeleted,
}) => {
    let complete = <div>Done</div>;

    if(!task.get('closed')) {
        complete = (
            <Button
                onClick={() => {
                    onComplete(task.get('id'))
                }}>
                Complete <Glyphicon glyph="ok" />
            </Button>
        )
    }
    return (
        <Row>
            <Col sm={ 8 }>
                { complete }
            </Col>
            <Col sm={ 4 }>
                <Button
                    onClick={() => {
                        onDeleted(task.get('id'));
                    }}>
                    <Glyphicon glyph="trash" />
                </Button>
            </Col>
        </Row>
    )
}

TaskControlGroup.propTypes = {
    task: PropTypes.instanceOf(Map).isRequired,
    onComplete: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
}

export default TaskControlGroup;