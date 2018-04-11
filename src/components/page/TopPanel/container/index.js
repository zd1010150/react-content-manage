import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toggleLanguage, fetchGlobalSetting } from 'store/global/action';
import Language from '../component/language';
import TopNav from '../component/topStaticNav';
import Welcome from '../component/welcomeMsg';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);

import { tryLogout } from 'views/LoginForm/flow/actions';
import UserSettings from '../component/UserSettings';
import { Layout, Input, Button, Icon } from 'antd';

const { Header } = Layout;

class topPanel extends React.Component {
  changeLanguage(language) {
    const { toggleLanguage, fetchGlobalSetting } = this.props;
    toggleLanguage(language);
    fetchGlobalSetting();
  }

  onLogoutClick = () => {
    this.props.tryLogout();
  }

  render() {
    const {
      language, account, permissions, email,
    } = this.props;
    return (
      <Header className={cx('header')}>
        <div className={cx('siteTitle')}>logix crm</div>
        <TopNav permissions={permissions} />
        <UserSettings email={email} onClick={this.onLogoutClick} />
        <Language language={language} onChange={language => this.changeLanguage(language)} />
        <Link className={cx('setupBtn')} to="/setup/company-info/company-info"><Icon type="setting" />Setup</Link>
        <Input.Search
          placeholder="input search text"
          style={{ width: 200, marginTop: 7, float: 'right' }}
        />
      </Header>
    );
  }
}

topPanel.propTypes = {
  language: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
  fetchGlobalSetting: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};
const mapStateToProps = ({ loginUser, global }) => ({
  language: global.language,
  account: global.account,
  permissions: global.permissions,
  email: loginUser.email,
});
const mapDispatchToProp = {
  toggleLanguage,
  fetchGlobalSetting,
  tryLogout,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(topPanel);
export default TopPanel;

