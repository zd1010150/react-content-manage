/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { getAbsolutePath } from 'config/magento.config';
import styles from '../HeaderContent.less';
import logo from 'assets/images/logo.png';

const cx = classNames.bind(styles);
const logoView = ({ language }) => (
  <a className={cx('logo')} href={getAbsolutePath('/', language)}><img src={logo} alt=" breakable logo" /></a>
);

logoView.propTypes = {
  language: PropTypes.string.isRequired,
};


export default logoView;
