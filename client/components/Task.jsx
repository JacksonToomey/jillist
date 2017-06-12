import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

export default ({
    task
}) => {
    return (
        <Row className="jillist-task">
            <Col xs={ 12 }>
                <Panel>
                    <Row>
                        <Col sm={ 5 }>
                            { task.get('description') }
                        </Col>
                        <Col sm={ 5 }>
                            { task.get('duedate') }
                        </Col>
                        <Col sm={ 2 }>
                            Buttons
                        </Col>
                    </Row>
                </Panel>
            </Col>
        </Row>
    )
}