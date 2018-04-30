import React from 'react';
import _ from 'lodash';
import { Input, Icon } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Permission } from  'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { toggleLanguage, fetchGlobalSetting } from 'store/global/action';
import { setSearchKey } from 'views/GlobalSearch/flow/action';
import { tryLogout } from 'views/LoginForm/flow/actions';
import UserSettings from '../component/UserSettings';

import Language from '../component/language';
import TopNav from '../component/topStaticNav';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);


class topPanel extends React.Component {
  changeLanguage(language) {
    const { toggleLanguage, fetchGlobalSetting } = this.props;
    toggleLanguage(language);
    fetchGlobalSetting();
  }
  onLogoutClick = () => {
    this.props.tryLogout();
  }
  onSearch = (keys) => {
    const { setSearchKey, history } = this.props;
    setSearchKey(keys);
    history.push('/globalSearch');
  }
  render() {
    const {
      language, account, name, logo,
    } = this.props;
    return (
      <div
        className={cx('header')}
      >
        <div className={cx('siteTitle')}> <img src={logo} className={cx('crm-logo')} alt="company logo" /></div>
        <TopNav />
        <UserSettings name={name} logoutHandler={() => this.onLogoutClick()} />
        <Language language={language} onChange={language => this.changeLanguage(language)} />
        <Permission permission={PERMISSIONS.SETUP}>
          <Link className={cx('setupBtn')} to="/setup/company-info/company-info"><Icon className="mr-sm" type="setting" />Setup</Link>
        </Permission>
        <Input.Search
          onSearch={this.onSearch}
          className={classNames('input-material-theme bright')}
          placeholder="search"
          style={{ width: 200, marginTop: 7, float: 'right' }}
          enterButton
        />
      </div>
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
  name: loginUser.name,
  logo: global.companyLogo,
});
const mapDispatchToProp = {
  toggleLanguage,
  fetchGlobalSetting,
  tryLogout,
  setSearchKey,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(withRouter(topPanel));
export default TopPanel;

