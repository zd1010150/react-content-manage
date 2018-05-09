/**
 * This component is for display error message and use the similar style in antd form validation.
 * The reason we create this common component is because in antd design error text need a higher component with a 'hasError' class to have correct style.
 */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from './index.less';

const cx = classNames.bind(styles);


const defaultProps = {
  intlId: 'global.errors.required',
};
const propTypes = {
  intl: intlShape.isRequired,
  intlId: PropTypes.string,
};


const ErrorText = ({ intl, intlId }) => {
  const { formatMessage } = intl;

  return (
    <div className={cx('errorText')}>
      {formatMessage({ id: intlId })}
    </div>
  );
};


ErrorText.defaultProps = defaultProps;
ErrorText.propTypes = propTypes;
export default injectIntl(ErrorText);
