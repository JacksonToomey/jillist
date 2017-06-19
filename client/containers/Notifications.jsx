import React from 'react';
import { connect } from 'react-redux';

import Notification from '../components/Notification';

import { getSortedNotifications } from '../store/state/notifications/selectors';

import { clearNotification } from '../store/state/notifications/actions';


const Comp = ({
    notifications,
    remove
}) => {
    return (
        <div className="app-notifications">
            {notifications.map((notification, key) => {
                return <Notification
                    onClick={ remove }
                    key={ key }
                    notification={ notification }/>
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    notifications: getSortedNotifications(state)
})

const mapDispatchToProps = dispatch => ({
    remove: id => {
        dispatch(clearNotification(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
