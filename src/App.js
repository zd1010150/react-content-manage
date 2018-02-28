/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import './assets/less/index.less';
import { MainLayout, SetupLayout, CmsLayout, ResultNotificationLayout } from './components/layout/index';
import EnumsManager from './utils/EnumsManager';
import { getStore } from './utils/localStorage';
import LoginForm from './views/LoginForm/index';
const contextTypes = { store: PropTypes.object };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: getStore(EnumsManager.LocalStorageKey),
    };
  }

  componentDidMount() {
    const { store } = this.context;
    const me = this;
    this.unsubscribe = store.subscribe(() => {
      const { loginUser } = store.getState();
      if (!_.isEqual(loginUser, me.state.loginUser)) {
        me.setState({ loginUser });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  hasLoggedIn = () => {
    // we'll check the login status in localstorage instead of redux/session storage
    // because it will help us to sync the status across application instances
    const loginUser = getStore(EnumsManager.LocalStorageKey);
    if (_.isEmpty(loginUser)) {
      return false;
    }
    return true;
  }

  render() {
    // TODO: Skip the login if in dev mode
    // const isDevMode = process.env.NODE_ENV === 'development' ? true : false;
    return (
      <div>
        {!this.hasLoggedIn() ? (
          <LoginForm />
        ) : (
          <div className="App">
            <MainLayout />
          </div>
        )}
      </div>
    );
  }
}

App.contextTypes = contextTypes;
export default withRouter(App);
