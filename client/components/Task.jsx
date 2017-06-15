import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import DateDisplay from '../components/DateDisplay';

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
                            <DateDisplay date={ task.get('duedate') } />
                        </Col>
                    </Row>
                </Panel>
            </Col>
        </Row>
    )
}