import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label, ProgressBar } from 'react-bootstrap';

import { getTotals } from '../store/state/stats/selectors';

const Comp = ({
    totals,
}) => {
    if(!totals) {
        return <div className="admin-rowcount"><ProgressBar active now={ 100 } bsStyle="info"/></div>
    }
    console.log(totals.toJS())
    return (
        <div className="admin-rowcount">
            <h2>Rows Used</h2>
            <Row>
                <Col sm={ 4 }>
                    <h4>Tasks</h4>
                    <Label style={{ fontSize: '20px'}}>
                        { totals.get('tasks') }
                    </Label>
                </Col>
                <Col sm={ 4 }>
                    <h4>User</h4>
                    <Label style={{ fontSize: '20px'}}>
                        { totals.get('users') }
                    </Label>
                </Col>
                <Col sm={ 4 }>
                    <h4>Total</h4>
                    <Label style={{ fontSize: '20px'}}>
                        { totals.get('tasks') + totals.get('users') }
                    </Label>
                </Col>
            </Row>
        </div>
    );
};


const mapStateToProps = state => ({
    totals: getTotals(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
