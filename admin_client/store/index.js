import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import ReduxThunk from 'redux-thunk'

import routes from './routes';

import controllers from '../../shared_client/middleware/controllers';

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
        }),
        compose(enhancer, applyMiddleware(
            ReduxThunk,
            controllers,
            middleware,
        ))
    );

    let initialLocation = store.getState().router;
    if (initialLocation) {
        store.dispatch(initializeCurrentLocation(initialLocation));
    }

    return store;
}