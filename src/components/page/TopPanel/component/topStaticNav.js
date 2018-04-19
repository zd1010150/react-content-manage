import { Menu } from 'antd';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
const { ThemeTypes } = Enums;


const propTypes = {
  intl: intlShape.isRequired
};


const TopNav = ({ intl, permissions, location }) => {
  const { formatMessage } = intl;
  const i18n = 'global.properNouns';
  // TODO: hide specific tabs based on user's permissions
  //       need to discuss the permission json format with be dev
  //       and then add functionality to hide specific tabs
  const nav = [
    { id: 'dashboard', href: '/dashboard' },
    { id: 'leads', href: '/leads' },
    { id: 'accounts', href: '/accounts' },
    { id: 'opportunities', href: '/opportunities' },
    { id: 'report', href: '/reports' },
  ];
  
  const { pathname } = location;
  const defaultKey = nav.find(item => pathname.indexOf(item.href) !== -1);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={defaultKey ? [defaultKey.id] : void 0}
    >
      {nav.map(item => {
        const key = item.id;
        const theme = ThemeTypes[key.charAt(0).toUpperCase() + key.slice(1)];
        return (
          <Menu.Item key={key} className={`${theme}-theme-menu`}>
            <Link to={item.href}>
              {formatMessage({ id: `${i18n}.${key}` })}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};


TopNav.propTypes = propTypes;
export default withRouter(injectIntl(TopNav));
