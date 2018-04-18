import { Select } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styles from './index.less';
const Option = Select.Option;
const cx = classNames.bind(styles);


const defaultProps = {
  keyField: 'id',
  options: [],
  valueField: 'id',
};
const propTypes = {
  activeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,


  labelText: PropTypes.string,
  keyField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
};


const StyledSelect = ({
  activeId,

  options,
  onChange,
  labelText,
  keyField,
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
        defaultValue="All"
      >
        {options.map(option => 
          <Option
            key={option.keyField}
            value={option.valueField}
          >
            {option[valueField]}
          </Option>
        )}
      </Select>
    </Fragment>
  );
};

StyledSelect.defaultProps = defaultProps;
StyledSelect.propTypes = propTypes;
export default StyledSelect;