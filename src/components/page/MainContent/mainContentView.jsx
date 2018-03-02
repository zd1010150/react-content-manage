/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';


import {
  Leads,
  DDDemo,
  DragPreview,
  UIDemo,
} from 'views/index';

const MainContent = () => (
  <Switch>
    <Route path="/leads" component={Leads} />
    <Route path="/setup/dd-demo" component={DDDemo} />
    <Route path="/setup/drag-preveiw" component={DragPreview} />
    <Route path="/setup/ui-demo" component={UIDemo} />
  </Switch>
);
export default MainContent;
