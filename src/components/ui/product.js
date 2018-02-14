import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { MagentoProductImgPrefix } from 'config/magento.config';
import styles from './product.less';


const cx = classNames.bind(styles);

const productView = ({ intl, product }) => {
  const { formatMessage } = intl;
  const imgEl = <img className={cx('product-img')} src={`${MagentoProductImgPrefix}${product.image_url}`} alt={product.name} />;
  const getTootip = (el, info) => <Tooltip title={info}>{el}</Tooltip>;
  return (
    <div className={cx('product-wrapper')}>
      <div className={cx('product-img-wrapper')}>
        { _.isEmpty(product.magento_product_url) ? imgEl : <a target="_blank" href={product.magento_product_url}>{imgEl}</a> }
      </div>
      <div className={cx('product-info-wrapper')}>
        <div className={classNames(cx('product-name'), cx('product-info-line'))}>
          { getTootip(_.isEmpty(product.magento_product_url) ? <span>{product.name}</span> : <a target="_blank" href={product.magento_product_url}>{product.name}</a>, product.name) }
        </div>
        { getTootip(_.isEmpty(product.descibe) ? '' : <div className={classNames(cx('product-describe'), cx('product-info-line'))}>{ product.describe}</div>, product.describe)}
        { getTootip(_.isEmpty(product.sku) ? '' : <div className={classNames(cx('product-sku'), cx('product-info-line'))}> {product.sku}</div>, product.sku)}
        { _.isEmpty(product.weight) ? '' :
        <div className={classNames(cx('product-weight'), cx('product-info-line'))}><span> { formatMessage({ id: 'global.properNouns.goods.weight' }) }:</span>{product.weight}</div>
        }
      </div>
    </div>
  );
};
productView.defaultProps = {
  product: {
    name: '',
    describe: '',
    image_url: '',
    weight: 0,
    id: 0,
    magento_product_url: '',
    sku: '',
  },
};
productView.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.object,
};


export default injectIntl(productView);
