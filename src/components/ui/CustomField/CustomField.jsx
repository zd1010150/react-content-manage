import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, Input, InputNumber, DatePicker, Row, Col, Icon, Tooltip } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { DisplayField, EmailInput } from './index';
import { getRange } from 'utils/common';
import Enums from 'utils/EnumsManager';
//presets
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
  Display,
} = Enums.FieldTypes;


const defaultProps = {
  initialValue: '',
  options: [],
  size: 'small',
  type: '',
  readOnly: false,
  required: false,
  labelCol: {
    xs: 24,
    sm: 8,
  },
  useDefaultRowCls: true,
  valueCol: {
    xs: 24,
    sm: 16,
  },
};
const propTypes = {
  format: PropTypes.string,
  helpText: PropTypes.string,
  id: PropTypes.number.isRequired,
  initialValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelCol: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
  }).isRequired,
  lookupDisplayKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDropdownOpen: PropTypes.func,
  onRevertClick: PropTypes.func,
  options: PropTypes.array,
  readOnly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  rowCls: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  valueCol: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
  }).isRequired,
  useDefaultRowCls: PropTypes.bool.isRequired,
};


const CustomField = ({
  format,
  helpText,
  id,
  initialValue,
  label,
  labelCol,
  lookupDisplayKey,
  name,
  onBlur,
  onChange,
  onDoubleClick,
  onDropdownOpen,
  onRevertClick,
  options,
  readOnly,
  required,
  rowCls,
  size,
  type,
  value,
  valueCol,
  useDefaultRowCls,
}) => {

  const _onBlur = $ => {
    if (_.isFunction(onBlur)) {
      onBlur();
    }
  };

  const _onChange = (id, value) => {
    if (_.isFunction(onChange)) {
      onChange(id, value);
    }
  };

  const _onDropdownOpen = $ => {
    if (_.isFunction(onDropdownOpen)) {
      onDropdownOpen(id, options);
    }
  }

  const others = {
    className: cx('customField'),
    onBlur: _onBlur,
    size,
  };

  let field = null;
  switch (type) {
    case DateOnly:
    case DateTime:
      field = (
        <DatePicker
          { ...others }
          format={format}
          showTime={type === DateTime}
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          value={moment(value)}
          onChange={(date, dateString) => onChange(id, dateString)}
          // Overrides the default onBlur becasue when the calendar opens the input field lost focus
          onBlur={null}
          onOpenChange={state => {
            if (!state) return _onBlur();
          }}
        />
      );
      break;
    case Email:
      field = (
        <EmailInput
          { ...others }
          id={id}
          value={value}
          onChange={_onChange}
        />
      );
      break;
    case LongText:
      field = (
        <TextArea
          { ...others }          
          autosize={{ minRows: 2, maxRows: 6 }}
          value={value}
          onChange={e => _onChange(id, e.target.value)}
        />
      );
      break;
    case Lookup:
      field = (
        <Select
          { ...others }
          optionFilterProp="value"
          showSearch
          value={value}
          onChange={value => _onChange(id, value)}
          onFocus={_onDropdownOpen}
        >
          {options.map(option => 
            <Option key={option.id} value={option.id}>
              {option[lookupDisplayKey]}
            </Option>)}
        </Select>
      );
      break;
    case NumberInput:
      // Scale is how many digits will show after the dot
      // Precision is how many digits for the number, including the decimal part
      // const { precision, scale } = others;
      // const numRange = getRange(precision, scale);
      // TODO: there is a bug in InputNumber component, when users type directly in input, the min, max is not working until it blurred
      field = (
        // Warning: The Precision represents as scale in antd's InputNumber,
        //          we need to use scale to set InputNumber's precision
        <InputNumber
          { ...others }
          // precision={scale}
          // {...numRange}
          value={value}
          onChange={value => _onChange(id, value)}
        />
      );
      break;
    case PickList:
      field = (
        <Select
          { ...others }
          value={value}
          onChange={value => _onChange(id, value)}
        >
          {options.map(option =>
            <Option key={option.id} value={option.option_value}>
              {option.option_value}
            </Option>)}
        </Select>
      );
      break;
    case TextInput:
      field = (
        <Input
          value={value}
          onChange={e => _onChange(id, e.target.value)}
          {...others}
        />
      );
      break;
    case Display:
      field = (
        <DisplayField
          id={id}
          isValueChanged={value !== initialValue}
          readOnly={readOnly}
          value={value}
          onRevertClick={onRevertClick}
          onDoubleClick={onDoubleClick}
        />
      );
      break;
    default:
      throw new Error('The type is not found in custom field.');
  }

  return (
    <Row className={useDefaultRowCls ? cx('row') : rowCls}>
      <Col {...labelCol} style={{ textAlign: 'right' }}>
        <span className={required ? `${cx('required')} ${cx('label')}` : cx('label')}>
          {label}
        </span>
        {helpText ? <Tooltip title={helpText}>
          <Icon
            size="small"
            type="question-circle"
            className={cx('helpIcon')}
          />
        </Tooltip> : <div className={cx('iconPlaceholder')} />}
      </Col>
      <Col {...valueCol}>{field}</Col>
    </Row>
  );
};

CustomField.defaultProps = defaultProps;
CustomField.propTypes = propTypes;
export default CustomField;