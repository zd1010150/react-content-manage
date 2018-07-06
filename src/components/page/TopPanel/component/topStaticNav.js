import { Menu } from 'antd';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';

const { ThemeTypes, ObjectTypes } = Enums;
const { Leads, Accounts, Opportunities, Reports } = ObjectTypes;

const propTypes = {
  intl: intlShape.isRequired,
};


const TopNav = ({ intl, location, nextPath }) => {
  const { formatMessage } = intl;
  const i18n = 'global.properNouns';

  const nav = [
    { id: 'dashboard', href: '/dashboard', permission: PERMISSIONS.DASHBOARD },
    { id: 'leads', href: `/${Leads}`, permission: PERMISSIONS.LEADS },
    { id: 'accounts', href: `/${Accounts}`, permission: PERMISSIONS.ACCOUNTS },
    { id: 'opportunities', href: `/${Opportunities}`, permission: PERMISSIONS.OPPORTUNITIES },
    { id: 'report', href: `/${Reports}`, permission: PERMISSIONS.REPORTS },
  ];

  const { pathname } = location;
  const defaultKey = nav.find(item => nextPath.indexOf(item.href) !== -1);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={defaultKey ? [defaultKey.id] : undefined}
      selectedKeys={defaultKey ? [defaultKey.id] : undefined}
    >
      {nav.map((item) => {
        const key = item.id;
        const theme = ThemeTypes[key.charAt(0).toUpperCase() + key.slice(1)];
        return (
          <Menu.Item key={key} className={`${theme}-theme-menu`}>
            <Permission permission={item.permission}>
              <Link to={item.href} style={{color: "#FFFFFF"}} >
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
