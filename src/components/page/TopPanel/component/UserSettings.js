
/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../TopPanel.less';

const { Item } = Menu;
const propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
const cx = classNames.bind(styles);

const UserSettings = ({ intl, logoutHandler, name }) => {
  const { formatMessage } = intl;
  const settingOptions = [
    {
      key: 'emailSetting',
      path: '/user/email-setting​​​​​​​',
      isDisabled: false,
    },
    {
      key: 'mySetting',
      path: '/my-setting',
      isDisabled: false,

    },
    {
      key: 'logOut',
      path: '',
      isDisabled: false,
    },
  ];
  const menuItems = settingOptions.map((option) => {
    const child = option.key === 'logOut'
      ? <a href="javascript: void(0)" onClick={() => logoutHandler()}>{formatMessage({ id: `page.topPanel.${option.key}` })}</a>
      : <Link to={`${option.path}`}>{formatMessage({ id: `page.topPanel.${option.key}` })}</Link>;
    return <Item key={option.key} disabled={option.isDisabled}>{child}</Item>;
  });
  const menu = <Menu>{menuItems}</Menu>;
  return (
    <div data-role="language">
      <Dropdown overlay={menu}>
        <button className={cx('ant-dropdown-link')}>
          {name} <Icon type="down" />
        </button>
      </Dropdown>
    </div>
  );
};

UserSettings.propTypes = propTypes;
export default injectIntl(UserSettings);
