import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'

export default ({
    onAddClick
}) => {
    return (
        <Row className="jillist-task-header">
            <Col xs={ 10 }>
                <h2>Tasks</h2>
            </Col>
            <Col xs={ 2 }>
                <Button bsStyle="primary" onClick={ onAddClick }>
                    Add <Glyphicon glyph="plus" />
                </Button>
            </Col>
        </Row>
    )
}