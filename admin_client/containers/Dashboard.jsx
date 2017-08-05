import React from 'react';
import { connect } from 'react-redux';


const Comp = props => {
    return (
        <div>Dashboard</div>
    );
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
