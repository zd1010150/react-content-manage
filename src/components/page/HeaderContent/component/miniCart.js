/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from 'antd';
import { LOCAL_STORAGE_CART_KEY } from 'config/magento.config';
import { getStoreByKeys } from 'utils/localStorage';
import { getAbsolutePath } from 'config/magento.config';

const languageView = ({ language }) => {
  const count = getStoreByKeys(LOCAL_STORAGE_CART_KEY);
  return(
    <div data-role="mini-cart">
      <Badge count={count} offset={[10,20]}>
        <a href={getAbsolutePath('/checkout/cart/', language)} className="head-example" >
          <Icon type="shopping-cart" style={{fontSize: 20, color: '#757575', }}/>
        </a>
      </Badge>
    </div>
  );
}

// checkout/
languageView.propTypes = {
  language: PropTypes.string.isRequired,
};

export default languageView;
