import React from 'react';
import { connect } from 'react-redux';

import Usage from './Usage';

const Comp = props => {
    return (
        <div className="admin-dashboard">
            <div className="admin-widget">
                <Usage />
            </div>
        </div>
    );
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
