/* eslint-disable no-underscore-dangle */
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router-dom';
import { AuthLayout, MainLayout } from './components/layout/index';
import { PageLoading } from './components/page/index';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/" component={MainLayout} />
        </Switch>
        <PageLoading spinConfig={{ size: 'large' }} />
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(App);
