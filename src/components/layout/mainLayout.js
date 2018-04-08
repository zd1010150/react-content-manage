import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStore } from 'utils/localStorage';
import _ from 'lodash';
import { Layout } from 'antd';
import EnumsManager from 'utils/EnumsManager';
import { Route, Switch, Redirect } from 'react-router-dom';
import { loginSuccess } from 'views/LoginForm/flow/actions.js';

import { TopPanel, CopyRight, } from '../page/index';


import SubMainLayout from './subMainLayout';
import SetupLayout from './setupLayout';

const { Footer } = Layout;
class MainLayout extends React.Component {
    hasLoggedIn = () => {
      // we'll check the login status in localstorage instead of redux/session storage
      // because it will help us to sync the status across application instances
      const localLoginUser = getStore(EnumsManager.LocalStorageKey);
      if (!_.isEmpty(this.props.loginUser)) {
        return true;
      } else if (_.isEmpty(localLoginUser)) {
        return false;
      }
      this.props.loginSuccess(localLoginUser);
      return true;
    }

    render() {
      // TODO: Skip the login if in dev mode
      // const isDevMode = process.env.NODE_ENV === 'development' ? true : false;
      return (
        <div>
          { !this.hasLoggedIn() ? (
            <Redirect to="/auth/login" />
                ) : (
                  <Layout>
                    <TopPanel />
                    <Switch>
                      <Route path="/setup" component={SetupLayout} />
                      <Route path="/" component={SubMainLayout} />
                    </Switch>
                    <Footer ><CopyRight /></Footer>
                  </Layout>
            )}
        </div>
      );
    }
}

MainLayout.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  loginUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
const mapStateToProps = ({ loginUser }) => ({
  loginUser, // 将全局的user 信息注入到此组件
});
const mapDispatchToProp = {
  loginSuccess,
};


export default connect(mapStateToProps, mapDispatchToProp)(MainLayout);
