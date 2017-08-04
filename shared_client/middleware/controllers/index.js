import { LOCATION_CHANGED } from 'redux-little-router';


export default store => next => action => {
    let resp = next(action);
    if(action.type == LOCATION_CHANGED) {
        if(action.payload.result && action.payload.result.controller) {
            store.dispatch(action.payload.result.controller())
        }
    }
    return resp;
}