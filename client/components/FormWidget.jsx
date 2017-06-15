import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
} from 'react-bootstrap';


const FormWidget = ({
    name,
    value,
    label,
    errors,
    onChange,
    type,
}) => {
    let validation = null;
    if(errors.size > 0) {
        validation = 'error'
    }
    let body = <FormControl
        autoFocus
        type={ type }
        value={ value }
        placeholder={ label }
        onChange={e => {
            if(onChange) {
                onChange(e.target.value);
            }
        } }/>;
    if(type == 'date' || type == 'datetime') {
        if(value == '') {
            value = moment();
        }
        body = (
            <div>
                <DatePicker
                    selected={ value }
                    onChange={d => {
                        if(onChange) {
                            onChange(d);
                        }
                    } }
                    className="form-control" />
                <TimePicker
                    use12Hours
                    value={ value }
                    onChange={d => {
                        if(onChange) {
                            onChange(d);
                        }
                    }}
                    showSecond={false} />
            </div>
        )
    }
    return (
        <FormGroup validationState={ validation }>
            <ControlLabel>{ label }</ControlLabel>
            { body }
            <FormControl.Feedback />
            {errors.map((error, key) => <HelpBlock key={ key }>{ error }</HelpBlock>)}
        </FormGroup>
    )
}


FormWidget.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    errors: PropTypes.instanceOf(List),
    onChange: PropTypes.func,
    type: PropTypes.oneOf([
        'text',
        'datetime',
    ])
};

FormWidget.defaultProps = {
    value: '',
    errors: List(),
    type: 'text',
}

export default FormWidget;