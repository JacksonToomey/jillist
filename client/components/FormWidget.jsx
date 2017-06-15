import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
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
    return (
        <FormGroup validationState={ validation }>
            <ControlLabel>{ label }</ControlLabel>
            <FormControl
                autoFocus
                type={ type }
                value={ value }
                placeholder={ label }
                onChange={ onChange }/>
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
    ])
};

FormWidget.defaultProps = {
    value: '',
    errors: List(),
    type: 'text',
}

export default FormWidget;