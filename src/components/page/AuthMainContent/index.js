/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginForm } from 'views/index';

const mainContentView = () => (
    <Switch>
        <Route path="/auth/login" component={LoginForm} />
    </Switch>
);
export default mainContentView;
