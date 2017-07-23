import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import FormWidget from './FormWidget';
import DateDisplay from './DateDisplay';



class Editable extends React.Component {
    constructor(props) {
        super(props);

        this.displayClick = this.displayClick.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.doneEditing = this.doneEditing.bind(this);

        this.state = {
            editing: false,
        };
    }

    displayClick() {
        this.setState({editing: true});
    }

    keyPress(e) {
        if(e.key == 'Escape' || e.key == 'Enter') {
            this.doneEditing();
        }
    }

    doneEditing() {
        this.setState({editing: false});
        this.props.onDoneEditing();
    }

    render() {
        if(this.state.editing) {
            let props = {...this.props, inline: true, onEdit: this.doneEditing}

            return (
                <div onKeyDown={ this.keyPress }>
                    <FormWidget {...props} />
                </div>
            )
        }
        let value = this.props.value;
        if(this.props.type == 'datetime') {
            value = <DateDisplay date={ this.props.value }/>
        }
        if(this.props.value == null) {
            value = '-';
        }
        return (
            <div style={ this.props.style } onClick={ this.displayClick }>{ value }</div>
        )
    }
}


Editable.propTypes = Object.assign({
    onDoneEditing: PropTypes.func
}, FormWidget.propTypes)


Editable.defaultProps = {
    withLabel: false,
    onDoneEditing: () => {}
}

export default Editable;
