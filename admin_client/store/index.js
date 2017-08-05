import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import ReduxThunk from 'redux-thunk'

import routes from './routes';

import controllers from '../../shared_client/middleware/controllers';

import api from './middleware/api';

import stats from './state/stats';

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
            stats,
        }),
        compose(enhancer, applyMiddleware(
            ReduxThunk,
            controllers,
            middleware,
            api,
        ))
    );

    let initialLocation = store.getState().router;
    if (initialLocation) {
        store.dispatch(initializeCurrentLocation(initialLocation));
    }

    return store;
}