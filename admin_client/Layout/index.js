import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Fragment } from 'redux-little-router';

import Sidebar from '../containers/Sidebar';
import Dashboard from '../containers/Dashboard';

const Comp = props => {
    return (
        <Fragment forRoute="/admin/">
            <div>
                <Sidebar />
                <div className="admin-content">
                    <Fragment forRoute="/">
                        <Dashboard />
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comp);
