import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem} from 'react-bootstrap';

const Comp = props => {
    return (
        <div className="admin-sidebar">
            <Nav bsStyle="pills" activeKey={ 1 } stacked>
                <NavItem eventKey={ 1 } >Dashboard</NavItem>
            </Nav>
        </div>
    );
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
