import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import classNames from 'classnames/bind';
import { getParentUrl } from 'utils/url';
import styles from '../Sider.less';


const { SubMenu } = Menu;
const { Sider } = Layout;
const cx = classNames.bind(styles);


const pathPrefix = '/setup';
const menuItems = [
  {
    id: 'companyInfo',
    path: `${pathPrefix}/company-info`,
    children: [
      {
        id: 'uiDemo',
        path: `${pathPrefix}/company-info/ui-demo`,
        icon: 'setting',
      },
      {
        id: 'ddDemo',
        path: `${pathPrefix}/company-info/dd-demo`,
        icon: 'setting',
      },
      {
        id: 'dragPreview',
        path: `${pathPrefix}/company-info/drag-preveiw`,
        icon: 'setting',
      },

      {
        id: 'companyInfo',
        path: `${pathPrefix}/company-info/company-info`,
        icon: 'exclamation-circle-o',
      },
      {
        id: 'users',
        path: `${pathPrefix}/company-info/users`,
        icon: 'user',
      },
      {
        id: 'orgChart',
        path: `${pathPrefix}/company-info/chart`,
        icon: 'bar-chart',
      },
      {
        id: 'permissions',
        path: `${pathPrefix}/company-info/permissions`,
        icon: 'lock',
      },
    ],
  },
  {
    id: 'leads',
    path: `${pathPrefix}/leads`,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/leads/fields`,
        icon: 'setting',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/leads/pageLayout`,
        icon: 'setting',
      },
    ],
  },
  {
    id: 'accounts',
    path: `${pathPrefix}/accounts`,
    items: [
      {
        id: 'fields',
        path: `${pathPrefix}/accounts/fields`,
        icon: 'setting',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/accounts/pageLayout`,
        icon: 'setting',
      },
    ],
  },
  {
    id: 'opportunities',
    path: `${pathPrefix}/opportunities`,
    items: [
      {
        id: 'fields',
        path: `${pathPrefix}/opportunities/fields`,
        icon: 'setting',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/opportunities/pageLayout`,
        icon: 'setting',
      },
    ],
  },
  {
    id: 'email',
    path: `${pathPrefix}/email`,
  },
  {
    id: 'workflow',
    path: `${pathPrefix}/workflow`,
  },
];

const renderMenuItem = (intl) => {
  const { formatMessage } = intl;
  const i18nPath = 'global.sider';
  const getChildrenTree = (item) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          title={formatMessage({ id: `${i18nPath}.${item.id}` })}
          key={item.path}
          onTitleClick={() => {}}
        >
          { item.children.map(cItem => getChildrenTree(cItem))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path} className={cx('left-nav-item')}>
        <NavLink to={item.path}><Icon type={item.icon || 'setting'} />{ formatMessage({ id: `${i18nPath}.${item.id}` }) }</NavLink>
      </Menu.Item>);
  };

  return menuItems.map(item => getChildrenTree(item));
};
const SetupSider = ({ intl, location }) => (
  <Sider width={250} className={cx('setupSider')}>
    <div className={cx('siderTitle')}>setup</div>
    <Menu
      theme="dark"
      inlineIndent={8}
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      defaultOpenKeys={[getParentUrl(location.pathname)]}
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
    >
      {renderMenuItem(intl)}
    </Menu>
  </Sider>
);


SetupSider.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};
export default withRouter(injectIntl(SetupSider));
