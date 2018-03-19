import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  collapsed: false,
  collapsible: false,
};
const propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  collapsed: PropTypes.bool.isRequired,
  collapsible: PropTypes.bool.isRequired,
};

const SectionTitle = ({ title, onClick, collapsed, collapsible }) => {

  return (
    <div className={cx('sectionTitle')}>{title}</div>
  );
};

SectionTitle.defaultProps = defaultProps;
SectionTitle.propTypes = propTypes;
export default SectionTitle;