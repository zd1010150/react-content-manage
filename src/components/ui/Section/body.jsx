import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {};
const propTypes = {
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
};

const SectionBody = ({ body }) => {
  // 'body' is a React element, but is wrapped to a HOC. So it becomes a function instead of React element type
  // To avoid further warning about render, we need to assign this HOC to a variable and use it with JSX
  const BodyWrapper = body;
  return (
    <div className={cx('body')}>
      <BodyWrapper />
    </div>
  );
};

SectionBody.defaultProps = defaultProps;
SectionBody.propTypes = propTypes;
export default SectionBody;