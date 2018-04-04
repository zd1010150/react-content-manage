import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  label: 'display field',
  isLocked: false,
  isValueChanged: false,
};
const propTypes = {
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  readOnly: PropTypes.bool.isRequired,
  isValueChanged: PropTypes.bool.isRequired,
  onReloadClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

const DisplayField = ({
  id,
  label,
  helpText,
  value,
  readOnly,
  isValueChanged,
  onRevertClick,
  onDoubleClick,
}) => {

  const _onRevertClick = id => {
    if (_.isFunction(onRevertClick)) {
      onRevertClick(id);
    }
  };

  return (
    <div className={cx('displayField')}>
      <span onDoubleClick={onDoubleClick}>{value}</span>
      {isValueChanged && (
        <Icon
          size="small"
          type="reload"
          onClick={e => _onRevertClick(id)}
          className={cx('reloadIcon')}
        />
      )}
      {readOnly && <Icon size="small" type="lock" />}
    </div>
  );
}

DisplayField.defaultProps = defaultProps;
DisplayField.propTypes = propTypes;
export default DisplayField;