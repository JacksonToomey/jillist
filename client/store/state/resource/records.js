import { Record, Map } from 'immutable';

const ResourceStore = Record({
    items: Map(),
    fetching: false,
    loaded: false,
})

const State = Record({
    tasks: new ResourceStore()
});

export default State;
