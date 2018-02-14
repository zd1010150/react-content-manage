/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import Cookie from 'js-cookie';
import Base64 from 'base-64';
import { MagentoDomain } from 'config/magento.config';
import { intlShape, injectIntl } from 'react-intl';
import { MagentoStaticLink, Username } from 'components/ui/index';
import { getAbsolutePath } from 'config/magento.config';

const operatorView = ({
  intl, account,  language,
}) => {
  const { formatMessage } = intl;
  const operations = [
    { id: 'global.magento.topOperations.myAccount', href: '/customer/account/' },
    { id: 'global.magento.leftNav.myWishList', href: '/wishlist' },
  ];
  const uenc = Base64.encode(MagentoDomain+"/").replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ',');
  const menu = (
    <Menu>
      { operations.map((item, index) => (
        <Menu.Item key={index}>
          <MagentoStaticLink titleId={item.id} href={item.href} />
        </Menu.Item>
      ))
      }
      <Menu.Item>
        <form action={getAbsolutePath('/customer/account/logout', language)} name="signOutForm" method="post">
          <input type="hidden" name="form_key" value={Cookie.get('form_key')} />
          <input type="hidden" name="uenc" value={uenc} />
          <a href="javascript:void(0)" onClick={() => { document.forms.signOutForm.submit(); }} >
            {formatMessage({ id: 'global.magento.topOperations.signOut' })}
          </a>
        </form>
      </Menu.Item>

    </Menu>);
  return (
    <div data-role="operations">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          <Username firstName={account.first_name} lastName={account.last_name} /> <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};


operatorView.propTypes = {
  intl: intlShape.isRequired,
  account: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

const Operator = injectIntl(operatorView);
export default Operator;
