import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStore } from 'utils/localStorage';
import _ from 'lodash';
import classNames from 'classnames/bind';
import EnumsManager from 'utils/EnumsManager';
import { Route, Switch, Redirect } from 'react-router-dom';
import { loginSuccess } from 'views/LoginForm/flow/actions.js';
import styles from './layout.less';
import { fetchGlobalSetting, fetchAccountPermission } from 'store/global/action';

import { TopPanel, CopyRight } from '../page/index';


import SubMainLayout from './subMainLayout';
import SetupLayout from './setupLayout';

const cx = classNames.bind(styles);
class MainLayout extends React.Component {
  componentDidMount() {
    const {
      fetchGlobalSetting, fetchAccountPermission,
    } = this.props;
    const localLoginUser = getStore(EnumsManager.LocalStorageKey);
    if (!_.isEmpty(localLoginUser)) {
      fetchGlobalSetting();
      fetchAccountPermission();
    }
  }
    hasLoggedIn = () => {
      const {
        loginUser, loginSuccess,
      } = this.props;
      // we'll check the login status in localstorage instead of redux/session storage
      // because it will help us to sync the status across application instances
      const localLoginUser = getStore(EnumsManager.LocalStorageKey);
      if (_.isEmpty(localLoginUser)) {
        return false;
      }
      if (_.isEmpty(loginUser)) {
        loginSuccess(localLoginUser);
      }

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
                  <div className={cx('body-wrapper')}>
                    <div className={cx('header-wrapper')}>
                      <TopPanel />
                    </div>
                    <Switch>
                      <Route path="/setup" component={SetupLayout} />
                      <Route path="/" component={SubMainLayout} />
                    </Switch>
                    <div className={cx('footer-wrapper')}><CopyRight />
                    </div>
                  </div>
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
  fetchGlobalSetting,
  fetchAccountPermission,
};
export default connect(mapStateToProps, mapDispatchToProp)(MainLayout);
