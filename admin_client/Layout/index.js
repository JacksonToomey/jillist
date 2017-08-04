import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Fragment } from 'redux-little-router';

const Comp = props => {
    return (
        <Fragment forRoute="/admin/">
            <div>
                <Fragment forRoute="/">
                <div>I'm in the base route</div>
                </Fragment>
                <Fragment forRoute="foo">
                <div>I'm in the foo route</div>
                </Fragment>
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
