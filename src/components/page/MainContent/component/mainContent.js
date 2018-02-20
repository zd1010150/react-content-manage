/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DDDemo from 'views/DD-demo';

const mainContentView = () => (
  <Switch>
    <Route path="/dd-demo" component={DDDemo} />
  </Switch>
);
export default mainContentView;
