import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';
import ReduxThunk from 'redux-thunk'

import routes from './routes';

import api from './middleware/api';
import controllers from './middleware/controllers';
import notificationMiddleware from './state/notifications/middleware';

import resource from './state/resource';
import modals from './state/modals';
import notifications from './state/notifications';


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
            notifications,
        }),
        compose(enhancer, applyMiddleware(
            ReduxThunk,
            api,
            controllers,
            notificationMiddleware,
        ))
    );

    let initialLocation = store.getState().router;
    if (initialLocation) {
        store.dispatch(initializeCurrentLocation(initialLocation));
    }

    return store;
}