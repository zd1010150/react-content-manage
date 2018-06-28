/**
 * This component is used to replace CustomField in the future.
 * It will only return a field component by type, leaves the job of styling and layout to wrapper component.
 */
import { DatePicker, Input, InputNumber, Select } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Enums from 'utils/EnumsManager';
import { DisplayField, EmailInput } from './index';
import styles from './index.less';
import { getDisplayValue } from './utils';

const { TextArea } = Input;
const { Option } = Select;
const cx = classNames.bind(styles);
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
  ApiError,
} = Enums.FieldTypes;


const defaultProps = {
  options: [],
  size: 'small',
  type: '',
  readOnly: false,
};
const propTypes = {
  format: PropTypes.string,
  id: PropTypes.number.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
};


const CustomizedField = ({
  fetched,
  fieldType,
  format,
  id,
  initialValue,
  lookupDisplayKey,
  onBlur,
  onChange,
  onDoubleClick,
  onDropdownOpen,
  onRevertClick,
  options,
  readOnly,
  size,
  type,
  value,
}) => {
  const _onBlur = () => {
    if (_.isFunction(onBlur)) {
      onBlur(id);
    }
  };

  const _onChange = (id, value, extra) => {
    if (_.isFunction(onChange)) {
      onChange(id, value, extra);
    }
  };

  const _onDropdownOpen = () => {
    if (_.isFunction(onDropdownOpen)) {
      onDropdownOpen(id, fetched);
    }
  }

  const others = {
    className: cx('CustomizedField'),
    onBlur: _onBlur,
    size,
  };

  let field = null;
  switch (type) {
    case ApiError:
      return null;
    case DateOnly:
    case DateTime:
      field = (
        <DatePicker
          {...others}
          format={format}
          showTime={type === DateTime}
          // Invalid cases whose value will convert to 'invalid date' include empty string, null and non-digit string and so on.
          // More cases and info pls refer to => https://momentjs.com/docs/#/parsing/is-valid/
          value={moment(value).isValid() ? moment(value) : undefined}
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          onChange={(date, dateString) => _onChange(id, dateString, date)}
          // Overrides the default onBlur becasue when the calendar opens the input field lost focus
          onBlur={null}
          onOpenChange={(state) => {
            if (!state) return _onBlur();
          }}
        />
      );
      break;
    case Email:
      field = (
        <EmailInput
          {...others}
          id={id}
          value={value}
          onChange={_onChange}
        />
      );
      break;
    case LongText:
      field = (
        <TextArea
          {...others}
          autosize={{ minRows: 2, maxRows: 6 }}
          value={value}
          onChange={e => _onChange(id, e.target.value)}
        />
      );
      break;
    case Lookup:
      field = (
        <Select
          {...others}
          // TODO: enable async search functionality
          // optionFilterProp="value"
          // showSearch
          value={value}
          onChange={newValue => _onChange(id, newValue)}
          onFocus={_onDropdownOpen}
        >
          {options.map(option => (
            <Option key={option.id} value={option.id}>
              {option[lookupDisplayKey]}
            </Option>
          ))}
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
          {...others}
          // TODO: add precision check on new value
          // precision={scale}
          // {...numRange}
          value={value}
          onChange={newValue => _onChange(id, newValue)}
        />
      );
      break;
    case PickList:
      field = (
        <Select
          {...others}
          value={value}
          onChange={newValue => _onChange(id, newValue)}
        >
          {options.map(option => (
            <Option key={option.id} value={option.option_value}>
              {option.option_value}
            </Option>
          ))}
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
          value={fieldType === Lookup ?
                  getDisplayValue(value, options, lookupDisplayKey) :
                  value
          }
          onRevertClick={onRevertClick}
          onDoubleClick={onDoubleClick}
        />
      );
      break;
    default:
      throw new Error('The type is not found in custom field.');
  }

  return field;
};

CustomizedField.defaultProps = defaultProps;
CustomizedField.propTypes = propTypes;
export default CustomizedField;
