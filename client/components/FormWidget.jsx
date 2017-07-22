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
    withLabel,
}) => {
    if(value == null || typeof value === 'undefined') {
        value = '';
    }
    let validation = null;
    if(errors.size > 0) {
        validation = 'error'
    }
    let componentClass = 'input';
    if(type == 'textarea') {
        componentClass = 'textarea';
    }
    let body = <FormControl
        autoFocus
        type={ type }
        componentClass={ componentClass }
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

        if(typeof value === 'string') {
            value = moment(value);
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

    let labelDiv = <ControlLabel>{ label }</ControlLabel>;
    if(!withLabel) {
        labelDiv = null;
    }
    return (
        <FormGroup validationState={ validation }>
            { labelDiv }
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
        'textarea',
    ]),
    withLabel: PropTypes.bool,
};

FormWidget.defaultProps = {
    value: '',
    errors: List(),
    type: 'text',
    withLabel: true,
}

export default FormWidget;