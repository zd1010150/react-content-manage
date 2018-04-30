import { Menu } from 'antd';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';

const { ThemeTypes } = Enums;


const propTypes = {
  intl: intlShape.isRequired,
};


const TopNav = ({ intl, location }) => {
  const { formatMessage } = intl;
  const i18n = 'global.properNouns';
  //       need to discuss the permission json format with be dev
  //       and then add functionality to hide specific tabs
  const nav = [
    { id: 'dashboard', href: '/dashboard', permission: PERMISSIONS.DASHBOARD },
    { id: 'leads', href: '/leads', permission: PERMISSIONS.LEADS },
    { id: 'accounts', href: '/accounts', permission: PERMISSIONS.ACCOUNTS },
    { id: 'opportunities', href: '/opportunities', permission: PERMISSIONS.OPPORTUNITIES },
    { id: 'report', href: '/reports', permission: PERMISSIONS.REPORTS },
  ];

  const { pathname } = location;
  const defaultKey = nav.find(item => pathname.indexOf(item.href) !== -1);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={defaultKey ? [defaultKey.id] : void 0}
    >
      {nav.map((item) => {
        const key = item.id;
        const theme = ThemeTypes[key.charAt(0).toUpperCase() + key.slice(1)];
        return (

          <Menu.Item key={key} className={`${theme}-theme-menu`}>
            <Permission permission={item.permission}>
              <Link to={item.href}>
              {formatMessage({ id: `${i18n}.${key}` })}
              </Link>
            </Permission>
          </Menu.Item>

        );
      })}
    </Menu>
  );
};


TopNav.propTypes = propTypes;
export default withRouter(injectIntl(TopNav));
