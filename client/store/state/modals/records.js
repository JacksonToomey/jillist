import { Record, Map } from 'immutable';

const ModalRecord = Record({
    show: false,
    data: Map(),
    errors: Map(),
});

const State = Record({
    newTask: new ModalRecord()
});

export default State;
