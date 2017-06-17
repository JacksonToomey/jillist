import React from 'react';
import { connect } from 'react-redux';

import { Navbar } from 'react-bootstrap';


const Comp = props => {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <img src="/static/images/logo.png"/>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default connect()(Comp);
