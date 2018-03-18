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
  isLocked: PropTypes.bool.isRequired,
  isValueChanged: PropTypes.bool.isRequired,
  onReloadClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

const DisplayField = ({
  label,
  helpText,
  value,
  isLocked,
  isValueChanged,
  onReloadClick,
  onDoubleClick,
}) => {

  return (
    <div className={cx('displayField')}>
      <label>{label}</label>
      {!helpText && (<Tooltip title="prompt text">
                        <Icon size="small" type="info-circle" />
                      </Tooltip>)}
      <span onDoubleClick={onDoubleClick}>{value}</span>
      {isLocked && <Icon size="small" type="lock" />}
      {isValueChanged && (<Icon
                            size="small"
                            type="reload"
                            onClick={onReloadClick}
                            className={cx('reloadIcon')}/>)}
    </div>
  );
}

DisplayField.defaultProps = defaultProps;
DisplayField.propTypes = propTypes;
export default DisplayField;