/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DDDemo from 'views/DD-demo';
import DragPreview from 'views/dragPreview/index';

const mainContentView = () => (
  <Switch>
    <Route path="/dd-demo" component={DDDemo} />
    <Route path="/drag-preveiw" component={DragPreview} />
  </Switch>
);
export default mainContentView;
