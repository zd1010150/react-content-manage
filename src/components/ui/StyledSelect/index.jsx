import { Select } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styles from './index.less';
const Option = Select.Option;
const cx = classNames.bind(styles);


const defaultProps = {
  displayField: 'id',
  keyField: 'id',
  options: [],
  valueField: 'id',
};
const propTypes = {
  displayField: PropTypes.string.isRequired,
  keyField: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  valueField: PropTypes.string.isRequired,
};


const StyledSelect = ({
  displayField,
  keyField,
  labelText,
  onChange,
  options,
  value,
  valueField,
}) => {

  const _onChange = value => {
    if (_.isFunction(onChange)) {
      onChange(value);
    }
  };

  return (
    <Fragment>
      {labelText && <label className={cx('label')}>{labelText}</label>}
      <Select
        className={cx('select')}
        size="small"
        dropdownMatchSelectWidth={false}
        onChange={value => _onChange(value)}
        value={value}
      >
        {options.map(option => 
          <Option
            key={option[keyField]}
            value={option[valueField]}
          >
            {option[displayField]}
          </Option>
        )}
      </Select>
    </Fragment>
  );
};

StyledSelect.defaultProps = defaultProps;
StyledSelect.propTypes = propTypes;
export default StyledSelect;