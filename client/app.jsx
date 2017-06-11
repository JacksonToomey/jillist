import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'redux-little-router';
import { Provider } from 'react-redux';

import createStore from './store';

import Layout from './Layout';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore();

ReactDOM.render(
    <RouterProvider store={ store }>
        <Provider store={ store }>
            <Layout />
        </Provider>
    </RouterProvider>,
    document.getElementById('app')
);
