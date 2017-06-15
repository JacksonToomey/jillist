import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import ReduxThunk from 'redux-thunk'

import routes from './routes';

import api from './middleware/api';
import controllers from './middleware/controllers';

import resource from './state/resource';
import modals from './state/modals';


export default () => {

    const {
        reducer,
        middleware,
        enhancer
    } = routerForBrowser({
        routes,
    })

    const store = createStore(
        combineReducers({
            router: reducer,
            resource,
            modals,
        }),
        compose(enhancer, applyMiddleware(ReduxThunk, api, controllers))
    );

    let initialLocation = store.getState().router;
    if (initialLocation) {
        store.dispatch(initializeCurrentLocation(initialLocation));
    }

    return store;
}