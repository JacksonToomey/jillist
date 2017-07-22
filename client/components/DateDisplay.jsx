import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

const DateDisplay = ({
    date
}) => {
    let displayDate = date;
    if(typeof displayDate === 'string') {
        displayDate = moment(displayDate)
    }
    return (
        <span>
            { displayDate.format('L LT') }
        </span>
    )
}


DateDisplay.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(moment),
    ]).isRequired,
};

export default DateDisplay;
