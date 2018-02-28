import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import styles from '../Sider.less';
const propTypes = {
  intl: intlShape.isRequired
};

const renderMenuItem = (item, intl) => {  
  const { formatMessage } = intl;
  const i18nPath = 'global.sider';
  const title = formatMessage({ id: `${i18nPath}.${item.id}` });

  if (item.isSubMenu && _.isArray(item.items)) {
    const childItems = item.items.map(childItem => renderMenuItem(childItem, intl));
    return (
      <SubMenu
        key={item.id}
        title={<span>{title}</span>}
      >
        {childItems}
      </SubMenu>
    );
  }
  return (
    <Menu.Item
      key={item.id}
      className={cx('menuItem')}
    >
      {item.icon ? <Icon type={item.icon} /> : null}
      <Link className={cx('itemLink')} to={item.path}>{title}</Link>
    </Menu.Item>
  );
};

const SetupSider = ({ intl }) => {
  const pathPrefix = '/setup';
  const menuItems = [
    {
      id: 'companyInfo',
      isSubMenu: true,
      items: [
        {
          id: 'companyInfo',
          path: `${pathPrefix}/companyInfo`,
          icon: 'setting',
        },
        {
          id: 'users',
          path: `${pathPrefix}/users`,
          icon: 'setting',
        },
        {
          id: 'orgChart',
          path: `${pathPrefix}/chart`,
          icon: 'setting',
        },
        {
          id: 'permissions',
          path: `${pathPrefix}/permissions`,
          icon: 'setting',
        },
      ],
    },
    {
      id: 'leads',
      isSubMenu: true,
      items: [
        {
          id: 'fields',
          path: `${pathPrefix}/leadsFields`,
          icon: 'setting',
        },
        {
          id: 'pageLayout',
          path: `${pathPrefix}/leadsPageLayout`,
          icon: 'setting',
        },
      ],
    },
    {
      id: 'accounts',
      isSubMenu: true,
      items: [
        {
          id: 'fields',
          path: `${pathPrefix}/accountsFields`,
          icon: 'setting',
        },
        {
          id: 'pageLayout',
          path: `${pathPrefix}/accountsPageLayout`,
          icon: 'setting',
        },
      ],
    },
    {
      id: 'opportunities',
      isSubMenu: true,
      items: [
        {
          id: 'fields',
          path: `${pathPrefix}/opportunitiesFields`,
          icon: 'setting',
        },
        {
          id: 'pageLayout',
          path: `${pathPrefix}/opportunitiesPageLayout`,
          icon: 'setting',
        },
      ],
    },
    {
      id: 'email',
      path: `${pathPrefix}/email`,
      isSubMenu: false,
    },
    {
      id: 'workflow',
      path: `${pathPrefix}/workflow`,
      isSubMenu: false,
    },
  ];

  return (
    <Sider width={250} className={cx('setupSider')}>
      <div className={cx('siderTitle')}>setup</div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['companyInfo']}
        defaultOpenKeys={['companyInfo']}
        style={{ height: '100%', borderRight: 0 }}
      >
      {menuItems.map(item => renderMenuItem(item, intl))}
      </Menu>
    </Sider>
  );
};

SetupSider.propTypes = propTypes;
export default injectIntl(SetupSider);