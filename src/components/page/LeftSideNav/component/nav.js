/* eslint-disable react/prefer-stateless-function,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { intlShape } from 'react-intl';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getParentUrl } from 'utils/url';
import { MagentoStaticLink } from 'components/ui/index';
import styles from '../LeftSideNav.less';

const cx = classNames.bind(styles);
const { SubMenu } = Menu;
const AFFLIATE_MENU_INDEX = 4;

class Nav extends React.Component {

  render() {
    const { intl, location } = this.props;
    const { formatMessage } = intl;
    // magento static nav
    const magentoNavObj = [
      { id: 'global.magento.leftNav.accountDashboard', url: '/customer/account/index/' },
      { id: 'global.magento.leftNav.myOrders', url: '/sales/order/history/' },
      { id: 'global.magento.leftNav.myWishList', url: '/wishlist/' },
      { id: 'global.magento.leftNav.addressBook', url: '/customer/address/new/' },
      { id: 'global.magento.leftNav.accountInformation', url: '/customer/account/edit/' },
      { id: 'global.magento.leftNav.storedPaymentMethods', url: '/vault/cards/listaction/' },
      { id: 'global.magento.leftNav.billingAgreements', url: '/paypal/billing_agreement/' },
      { id: 'global.magento.leftNav.myProductsReviews', url: '/review/customer/' },
      { id: 'global.magento.leftNav.newsletterSubscription', url: '/newsletter/manage/' },
    ];
    // affiliate nav
    const affiliateNavObj = [
      {
        id: 'page.LeftSideNav.clientLists',
        url: '/clientLists',
        children: [{
          id: 'page.LeftSideNav.leads',
          url: '/clientLists/leads',
        }, {
          id: 'page.LeftSideNav.accounts',
          url: '/clientLists/accounts',
        }, {
          id: 'page.LeftSideNav.marketingMaterial',
          url: '/clientLists/marketingMaterial',
        }, {
          id: 'page.LeftSideNav.order',
          url: '/clientLists/order',
        }],
      },
      {
        id: 'page.LeftSideNav.priceSetting',
        url: '/priceSetting',
      },
      {
        id: 'page.LeftSideNav.trackOrders',
        url: '/trackOrders',
      },
    ];
    const getChildrenTree = (item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            title={formatMessage({ id: item.id })}
            key={item.url}
            onTitleClick={ ()=>{} }
          >
            { item.children.map(cItem => getChildrenTree(cItem))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url} className={cx('left-nav-item')}>
          <NavLink to={item.url}>{ formatMessage({ id: item.id }) }</NavLink>
        </Menu.Item>);
    };
    const magentoNav = () => magentoNavObj.map(item =>
      (
        <Menu.Item key={item.id} className={cx('left-nav-item')}>
          <MagentoStaticLink titleId={item.id} href={item.url} />
        </Menu.Item>
      ));
    const affliateNav = () => affiliateNavObj.map(item => getChildrenTree(item));
    // insert affliateNav
    const menu = magentoNav();
    menu.splice(AFFLIATE_MENU_INDEX, 0, ...affliateNav());
    return (
      <div>
        <Menu
          mode="inline"
          inlineIndent={30}
          className={cx('left-side-nav')}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[getParentUrl(location.pathname)]}
          selectedKeys={[location.pathname]}
        >
          { menu }
        </Menu>
      </div>
    );
  }
}


Nav.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};

export default Nav;
