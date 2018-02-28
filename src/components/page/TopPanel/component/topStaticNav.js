import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
const propTypes = {
  intl: intlShape.isRequired
};

const TopNav = ({ intl, permissions, location }) => {
  const { formatMessage } = intl;
  // TODO: hide specific tabs based on user's permissions
  //       need to discuss the permission json format with be dev
  //       and then add functionality to hide specific tabs
  const nav = [
    { id: 'dashboard', href: '/dashboard' },
    { id: 'leads', href: '/leads' },
    { id: 'accounts', href: '/accounts' },
    { id: 'opportunities', href: '/opportunities' },
    { id: 'reports', href: '/reports' },
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
        return (
          <Menu.Item key={key} className={key}>
            <Link to={item.href}>{key}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

TopNav.propTypes = propTypes;
export default withRouter(injectIntl(TopNav));
