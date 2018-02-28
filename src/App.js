/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './assets/less/index.less';
import { MainLayout, AuthLayout } from './components/layout/index';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/" component={MainLayout} />
        </Switch>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(App);

