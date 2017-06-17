import React from 'react';
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap';

import DateDisplay from '../components/DateDisplay';

export default ({
    task,
    onComplete,
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
                                    { task.get('description') }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={ 12 }>
                                    { task.get('details') }
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={ 5 }>
                            <DateDisplay date={ task.get('duedate') } />
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