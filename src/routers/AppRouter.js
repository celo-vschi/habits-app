import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AddHabitPage from '../components/AddHabitPage';
import EditHabitPage from '../components/edit/EditHabitPage';
import EditHabitsPage from '../components/edit/EditHabitsPage';
import CheckHabitsPage from '../components/check/CheckHabitsPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/check" component={CheckHabitsPage} />
                <PrivateRoute path="/create" component={AddHabitPage} />
                <PrivateRoute path="/edit/:id" component={EditHabitPage} />
                <PrivateRoute path="/edit" component={EditHabitsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;