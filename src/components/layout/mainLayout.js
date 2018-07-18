import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStore } from 'utils/localStorage';
import _ from 'lodash';
import classNames from 'classnames/bind';
import EnumsManager from 'utils/EnumsManager';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './layout.less';
import { fetchGlobalSetting, fetchAccountPermission, fetchLoginUserDetail } from 'store/global/action';

import { TopPanel, CopyRight } from '../page/index';


import SubMainLayout from './subMainLayout';
import SetupLayout from './setupLayout';

const cx = classNames.bind(styles);
class MainLayout extends React.Component {
  componentDidMount() {
    const {
      fetchGlobalSetting,
      fetchAccountPermission,
      fetchLoginUserDetail,
    } = this.props;
    const localLoginUser = getStore(EnumsManager.LocalStorageKey);
    if (!_.isEmpty(localLoginUser)) {
      fetchGlobalSetting();
      fetchAccountPermission();
      fetchLoginUserDetail();
    }
  }
    hasLoggedIn = () => {
      // we'll check the login status in localstorage instead of redux/session storage
      // because it will help us to sync the status across application instances
      const { loginUser } = this.props;
      const localLoginUser = getStore(EnumsManager.LocalStorageKey);
      if (_.isEmpty(localLoginUser)) {
        return false;
      }
      return !_.isEmpty(loginUser);
    }

    render() {
      // TODO: Skip the login if in dev mode
      // const isDevMode = process.env.NODE_ENV === 'development' ? true : false;
      const { location } = this.props;

      return (
        <div>
          { !this.hasLoggedIn() ? (
            <Redirect to="/auth/login" />
                ) : (
                  <div className={cx('body-wrapper')}>
                    <div className={cx('header-wrapper')}>
                      <TopPanel nextPath={location.pathname} />
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


const mapDispatchToProp = {
  fetchGlobalSetting,
  fetchAccountPermission,
  fetchLoginUserDetail,
};
const mapStateToProps = ({ loginUser }) => ({
    loginUser, // 将全局的user 信息注入到此组件
});
export default connect(mapStateToProps, mapDispatchToProp)(MainLayout);
