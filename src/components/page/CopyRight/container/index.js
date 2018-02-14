import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../Copyright.less';
import { getAbsolutePath } from 'config/magento.config';
import logo from 'assets/images/logo.png';
const cx = classNames.bind(styles);
const CopyRight = ({language}) => (
  <div className={classNames('row', cx('copyright-container'))}>
    <div className={classNames('col-sm-6', 'text-left', cx('copyright'))}>
      <small>Copyright © 2017 Breakable.</small>
    </div>
    <div className="col-sm-6 text-right">
      <a href={getAbsolutePath('/', language)}><img  className={cx('logo')} src={logo} alt=" breakable logo" /></a>
    </div>
  </div>
);
CopyRight.propTypes = {
  language: PropTypes.string.isRequired,
}
const mapStateToProps = ({ global }) => ({
  language: global.language,
})
export default connect(mapStateToProps)(CopyRight);
