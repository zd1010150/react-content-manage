import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Nav from '../component/nav';
import styles from '../HeaderNav.less';

const cx = classNames.bind(styles);

const headerNav = ({ language }) => (<div className={cx('header-nav')}><Nav language={language} /></div>);

headerNav.propTypes = {
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});


const HeaderNav = connect(mapStateToProps)(headerNav);
export default HeaderNav;

