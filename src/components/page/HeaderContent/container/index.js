import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Logo from '../component/logo';
import Search from '../component/search';
import MiniCart from '../component/miniCart';

import styles from '../HeaderContent.less';

const cx = classNames.bind(styles);

const headerContent = ({ language }) => (
  <div className={cx('header-content-wrapper')}>
    <Logo language={language} />
    <MiniCart language={language} />
    <Search language={language} />

  </div>
);

headerContent.propTypes = {
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});


const HeaderContent = connect(mapStateToProps)(headerContent);
export default HeaderContent;
