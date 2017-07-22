import React from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';


const ListHeader = props => {
    return (
        <Row>
            <Col sm={ 3 }>
                Title/Description
            </Col>
            <Col sm={ 3 }>
                Due Date
            </Col>
            <Col sm={ 3 }>
                Waiting On
            </Col>
            <Col sm={ 3 }>
                Controls
            </Col>
        </Row>
    )
}

export default ListHeader;
