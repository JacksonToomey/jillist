import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'redux-little-router';
import { Provider } from 'react-redux';

import createStore from './store';

import Layout from './Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import './app.scss';
import '../images/logo.png';
import '../images/favicon.png';

const store = createStore();

ReactDOM.render(
    <RouterProvider store={ store }>
        <Provider store={ store }>
            <Layout />
        </Provider>
    </RouterProvider>,
    document.getElementById('app')
);
