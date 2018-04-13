import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import classNames from 'classnames/bind';
import { getParentUrl } from 'utils/url';
import styles from '../Sider.less';
import { OBJECT_TYPES } from 'config/app.config';

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
        path: `${pathPrefix}/${OBJECT_TYPES.leads}/fields`,
        icon: 'profile',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.leads}/pageLayout`,
        icon: 'table',
      },
    ],
  },
  {
    id: 'accounts',
    path: `${pathPrefix}/accounts`,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/${OBJECT_TYPES.accounts}/fields`,
        icon: 'setting',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.accounts}/pageLayout`,
        icon: 'setting',
      },
    ],
  },
  {
    id: 'opportunities',
    path: `${pathPrefix}/opportunities`,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/${OBJECT_TYPES.opportunities}/fields`,
        icon: 'setting',
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.opportunities}/pageLayout`,
        icon: 'setting',
      },
    ],
  },
  {
    id: 'email',
    path: `${pathPrefix}/email`,
    children: [
      {
        id: 'templates',
        path: `${pathPrefix}/email/templates`,
        icon: 'setting',
      },
      {
        id: 'Campaign',
        path: `${pathPrefix}/email/campaign`,
        icon: 'setting',
      },
    ],
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
class SetupSider extends React.Component {
    state = {
      openKeys: [getParentUrl(this.props.location.pathname)],
    };
    onOpenChange = (openKeys) => {
      if (openKeys.length < 1) return;
      openKeys.shift();
      this.setState({
        openKeys,
      });
    }
    render() {
      const { intl, location } = this.props;
      return (
        <div className={cx('setupSider')}>
          <div className={cx('siderTitle')}>setup</div>
          <Menu
            theme="dark"
            inlineIndent={8}
            onOpenChange={this.onOpenChange}
            openKeys={this.state.openKeys}
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={[getParentUrl(location.pathname)]}
            selectedKeys={[location.pathname]}
            style={{ borderRight: 0 }}
          >
            {renderMenuItem(intl)}
          </Menu>
        </div>
      );
    }
}


SetupSider.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};
export default withRouter(injectIntl(SetupSider));
