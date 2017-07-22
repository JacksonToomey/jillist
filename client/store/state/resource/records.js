import { Record, Map } from 'immutable';

const ResourceStore = Record({
    items: Map(),
    fetching: false,
    loaded: false,
    deleteItem: null,
})

const State = Record({
    tasks: new ResourceStore()
});

export default State;
