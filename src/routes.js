import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components */
import Loader from '@components/Loader/Loader';

/* Constants */
import RoutesConstants from '@constants/routes';

/* Routes */
const Login = lazy(() => import('./containers/Login/Login'));
const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));

export default (
    <Suspense fallback={<Loader size={3} />}>
        <Switch>
            <Route exact path={RoutesConstants.ROOT} component={Login} />
            <Route path={RoutesConstants.DASHBOARD} component={Dashboard} />
        </Switch>
    </Suspense>
);
