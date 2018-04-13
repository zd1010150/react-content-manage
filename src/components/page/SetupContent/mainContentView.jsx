/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  DDDemo,
  DragPreview,
} from 'views/index';

const MainContent = () => (
  <div className="test">
    <Switch>
      <Route path="/setup/dd-demo" component={DDDemo} />
      <Route path="/setup/drag-preveiw" component={DragPreview} />
    </Switch>
  </div>
);
export default MainContent;
