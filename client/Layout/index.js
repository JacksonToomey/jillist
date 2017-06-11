import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Fragment } from 'redux-little-router';

import Navigation from '../containers/Navigation';
import Tasks from '../containers/Tasks';


const Comp = props => {
    return (
        <Fragment forRoute="/">
            <div>
                <Navigation />
                <Grid>
                    <Fragment forRoute="/">
                        <Tasks />
                    </Fragment>
                </Grid>
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
