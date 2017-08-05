import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Table } from 'react-bootstrap';

import { getUsage } from '../store/state/stats/selectors';


const Comp = ({
    usage
}) => {
    if(!usage) {
        return (
             <div className="admin-usage">
                 <ProgressBar active now={ 100 } bsStyle="info"/>
            </div>
        )
    }
    return (
        <div className="admin-usage">
            <h2>Usage</h2>
            <Table responsive>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Active</th>
                        <th>Deleted</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {usage.map((u, key) => {
                        console.log(u.toJS());
                        return (
                            <tr key={ key }>
                                <td>{ u.get('user') }</td>
                                <td>{ u.get('active_count') }</td>
                                <td>{ u.get('deleted_count') }</td>
                                <td>{ u.get('total_count') }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};


const mapStateToProps = state => ({
    usage: getUsage(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
