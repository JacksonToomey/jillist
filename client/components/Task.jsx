import React from 'react';
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap';

import DateDisplay from './DateDisplay';
import Editable from './Editable'

export default ({
    task,
    onComplete,
    onUpdate,
    onEdited,
}) => {
    let controls = (
        <Button
            onClick={() => {
                if(onComplete) {
                    onComplete(task.get('id'));
                }
            } }>
            Complete <Glyphicon glyph="ok" />
        </Button>
    )

    if(task.get('closed')) {
        controls = <div>Done</div>
    }
    return (
        <Row className="jillist-task">
            <Col xs={ 12 }>
                <Panel>
                    <Row>
                        <Col sm={ 5 }>
                            <Row>
                                <Col xs={ 12 }>
                                    <Editable
                                        name="description"
                                        label="Title"
                                        onDoneEditing={ onEdited }
                                        onChange={val => {
                                            onUpdate('description', val, task.get('id'))
                                        }}
                                        value={ task.get('description') }/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={ 12 }>
                                    <Editable
                                        name="details"
                                        label="Description"
                                        type="textarea"
                                        onDoneEditing={ onEdited }
                                        onChange={val => {
                                            onUpdate('details', val, task.get('id'))
                                        }}
                                        value={ task.get('details') }/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={ 5 }>
                            <Editable
                                name="duedate"
                                label="Due date"
                                type="datetime"
                                onDoneEditing={ onEdited }
                                onChange={val => {
                                    onUpdate('duedate', val, task.get('id'))
                                }}
                                value={ task.get('duedate') }/>
                        </Col>
                        <Col sm={ 2 }>
                            { controls }
                        </Col>
                    </Row>
                </Panel>
            </Col>
        </Row>
    )
}