import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable'
import { Alert } from 'react-bootstrap';


const Notification = ({
    notification,
    onClick
}) => {
    let type = notification.get('type')
    if(!type) {
        type = 'info';
    }
    let className = "app-notification";
    if(notification.get('removed')) {
        className += ' removed';
    }
    return (
        <Alert
            className={ className }
            bsStyle={ type }
            onClick={ () => { onClick(notification.get('id')) } }>
            { notification.get('message') }
        </Alert>
    )
}


Notification.propTypes = {
    notification: PropTypes.instanceOf(Map).isRequired
}


export default Notification;
