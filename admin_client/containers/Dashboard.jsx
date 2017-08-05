import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Usage from './Usage';
import Rows from './Rows';

const Comp = props => {
    return (
        <div className="admin-dashboard">
            <Row>
                <Col sm={ 6 }>
                    <div className="admin-widget">
                        <Usage />
                    </div>
                </Col>
                <Col sm={ 6 }>
                    <div className="admin-widget">
                        <Rows />
                    </div>
                </Col>
            </Row>
        </div>
    );
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
