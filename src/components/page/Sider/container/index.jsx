import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { OBJECT_TYPES } from 'config/app.config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Menu, Icon } from 'antd';
import classNames from 'classnames/bind';
import { getParentUrl } from 'utils/url';
import { setRouterHash } from 'store/global/action';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import styles from '../Sider.less';


const { SubMenu } = Menu;
const cx = classNames.bind(styles);


const pathPrefix = '/setup';
const menuItems = [
  {
    id: 'companyInfo',
    path: `${pathPrefix}/company-info`,
    permission: PERMISSIONS.SETUP_COMPANYPROFILE,
    children: [
      {
        id: 'companyInfo',
        path: `${pathPrefix}/company-info/company-info`,
        icon: 'exclamation-circle-o',
        permission: PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION,
      },
      {
        id: 'users',
        path: `${pathPrefix}/company-info/users`,
        icon: 'user',
        permission: PERMISSIONS.SETUP_COMPANYPROFILE_USERS,
      },
      {
        id: 'orgChart',
        path: `${pathPrefix}/company-info/chart`,
        icon: 'bar-chart',
        permission: PERMISSIONS.SETUP_COMPANYPROFILE_ORGANISATIONALCHART,
      },
      {
        id: 'permissions',
        path: `${pathPrefix}/company-info/permissions`,
        icon: 'lock',
        permission: PERMISSIONS.SETUP_COMPANYPROFILE_PERMISSIONPROFILE,
      },
    ],
  },
  {
    id: 'leads',
    path: `${pathPrefix}/leads`,
    permission: PERMISSIONS.SETUP_LEADS,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/${OBJECT_TYPES.leads}/fields`,
        icon: 'profile',
        permission: PERMISSIONS.SETUP_LEADS_FIELDS,
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.leads}/pageLayout`,
        icon: 'table',
        permission: PERMISSIONS.SETUP_LEADS_PAGELAYOUT,
      },
    ],
  },
  {
    id: 'accounts',
    path: `${pathPrefix}/accounts`,
    permission: PERMISSIONS.SETUP_ACCOUNTS,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/${OBJECT_TYPES.accounts}/fields`,
        icon: 'profile',
        permission: PERMISSIONS.SETUP_ACCOUNTS_FIELDS,
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.accounts}/pageLayout`,
        icon: 'table',
        permission: PERMISSIONS.SETUP_ACCOUNTS_PAGELAYOUT,
      },
    ],
  },
  {
    id: 'opportunities',
    path: `${pathPrefix}/opportunities`,
    permission: PERMISSIONS.SETUP_OPPORTUNITIES,
    children: [
      {
        id: 'fields',
        path: `${pathPrefix}/${OBJECT_TYPES.opportunities}/fields`,
        icon: 'profile',
        permission: PERMISSIONS.SETUP_OPPORTUNITIES_FIELDS,
      },
      {
        id: 'pageLayout',
        path: `${pathPrefix}/${OBJECT_TYPES.opportunities}/pageLayout`,
        icon: 'table',
        permission: PERMISSIONS.SETUP_OPPORTUNITIES_PAGELAYOUT,
      },
    ],
  },
  {
    id: 'email',
    path: `${pathPrefix}/email`,
    permission: PERMISSIONS.SETUP_EMAILCOMMUNICATIONS,
    children: [
      {
        id: 'templates',
        path: `${pathPrefix}/email/templates`,
        icon: 'setting',
        permission: PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES,
      },
      {
        id: 'Campaign',
        path: `${pathPrefix}/email/campaign`,
        icon: 'setting',
      },
    ],
  },

];

const renderMenuItem = (intl, accountPermissions) => {
  const { formatMessage } = intl;
  const i18nPath = 'global.sider';
  const getChildrenTree = (item) => {
    if (accountPermissions.indexOf(item.permission) > -1) {
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
        <Menu.Item key={item.path}>
          <NavLink to={item.path}><Icon type={item.icon || 'setting'} />{ formatMessage({ id: `${i18nPath}.${item.id}` }) }</NavLink>
        </Menu.Item>
      );
    }
  };
  return menuItems.map(item => getChildrenTree(item));
};
class SetupSider extends React.Component {
    state = {
      hash: Math.random(),
      openKeys: [getParentUrl(this.props.location.pathname)],
    };
    onOpenChange = (openKeys) => {
      if (openKeys.length < 1) return;
      openKeys.shift();
      this.setState({
        openKeys,
      });
    }
    reforceRefresh=() => {
      this.props.setRouterHash(Math.random());
    }
    render() {
      const { intl, location, accountPermissions } = this.props;
      return (
        <div className={cx('setupSider')}>
          <div className={cx('siderTitle')}>setup</div>
          <Permission permission={PERMISSIONS.SETUP}>
            <Menu
              theme="dark"
              onClick={this.reforceRefresh}
              inlineIndent={8}
              onOpenChange={this.onOpenChange}
              openKeys={this.state.openKeys}
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={[getParentUrl(location.pathname)]}
              selectedKeys={[location.pathname]}
              style={{ borderRight: 0 }}
            >
              {renderMenuItem(intl, accountPermissions, this.state.hash)}
            </Menu>
          </Permission>
        </div>
      );
    }
}


SetupSider.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};
const mapStateToProps = ({ global }) => ({
  accountPermissions: global.permissions,
});
const mapDiapatchToProps = {
  setRouterHash,
};

export default withRouter(connect(mapStateToProps, mapDiapatchToProps)(injectIntl(SetupSider)));
