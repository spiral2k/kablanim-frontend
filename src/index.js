/* eslint-disable-next-line */
import Polyfill from '@utils/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from '@redux/store';
import Layout from '@containers/Layout/Layout';
import routes from './routes';

ReactDOM.render(
    <HashRouter>
        <Provider store={Store}>
            <Layout>{routes}</Layout>
        </Provider>
    </HashRouter>,
    document.getElementById('daytwo-root')
);
