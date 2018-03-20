import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
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
  const caretDirection = collapsed ? 'right' : 'down';
  return (
    <div className={cx('title')}>
      {collapsible && (
        <Icon
          className={cx('collapseIcon')}
          type={`caret-${caretDirection}`}
          onClick={onClick}
        />
      )}
      {title}
    </div>
  );
};

SectionTitle.defaultProps = defaultProps;
SectionTitle.propTypes = propTypes;
export default SectionTitle;