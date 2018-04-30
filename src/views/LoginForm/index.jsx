import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getStore } from 'utils/localStorage';
import { tryLogin } from '../LoginForm/flow/actions';
import LoginForm from './container/index';
import EnumsManager from 'utils/EnumsManager';

class LoginFormWrapper extends Component {


  hasLoggedIn = () => {
    const localLoginUser = getStore(EnumsManager.LocalStorageKey);
    if (!_.isEmpty(localLoginUser)) {
      return true;
    }
    return false;
  }

  render() {
    const { tryLogin } = this.props;
    return (
      this.hasLoggedIn()
        ? <Redirect to="/" />
        : <LoginForm tryLogin={tryLogin} />
    );
  }
}

const mapStateToProps = ({ loginUser }) => ({
  loginUser,
});
const mapDispatchToProps = {
  tryLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginFormWrapper);