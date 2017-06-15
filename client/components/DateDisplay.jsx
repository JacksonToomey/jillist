import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

const DateDisplay = ({
    date
}) => {
    let displayDate = moment(date);
    return (
        <span>
            { displayDate.format('L') }
        </span>
    )
}


DateDisplay.propTypes = {
    date: PropTypes.string.isRequired,
};

export default DateDisplay;
