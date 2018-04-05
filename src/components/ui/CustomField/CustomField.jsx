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
};
const propTypes = {
  active: PropTypes.bool.isRequired,  
  helpText: PropTypes.string,
  id: PropTypes.number.isRequired,
  initialValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onRevertClick: PropTypes.func,
  options: PropTypes.array,
  readOnly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  value: PropTypes.string,
};


const CustomField = ({
  active,
  helpText,
  id,
  initialValue,
  label,
  name,
  onBlur,
  onChange,
  onDoubleClick,
  onRevertClick,
  options,
  readOnly,
  required,
  size,
  type,
  value,
}) => {

  const _onChange = (id, value) => {
    if (_.isFunction(onChange)) {
      onChange(id, value);
    }
  };  

  const _onBlur = $ => {
    if (_.isFunction(onBlur)) {
      onBlur();
    }
  };

  const baseCls = cx('customField');  

  let field = null;
  const others = {
    size,
    onBlur: e => _onBlur(),
  };

  switch (type) {
    case DateOnly:
      field = (
        <DatePicker
          {...others}
          className={cx('customField')}
          format="YYYY-MM-DD"
          onChange={(date, dateString) => onChange(id, dateString)}
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          value={moment(others.value)}
        />
      );
      break;
    case DateTime:
      field = (
        <DatePicker
          {...others}
          className={cx('customField')}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(date, dateString) => onChange(id, dateString)}
          showTime
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          value={moment(others.value)}
        />
      );
      break;
    case Email:
      field = (
        <EmailInput
          {...others}
          className={cx('customField')}
          id={id}
          onChange={onChange}
        />
      );
      break;
    case LongText:
      field = (
        <TextArea
          {...others}
          className={cx('customField')}
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={e => onChange(id, e.target.value)}
        />
      );
      break;
    case Lookup:
      field = (
        <Select
          {...others}
          className={cx('customField')}
          mode="combobox"
          onChange={values => onChange(id, values)}
        >
          {options.map(option => <Option key={option.id}>{option.value}</Option>)}
        </Select>
      );
      break;
    case NumberInput:
      // Scale is how many digits will show after the dot
      // Precision is how many digits for the number, including the decimal part
      const { precision, scale } = others;
      const numRange = getRange(precision, scale);
      // TODO: there is a bug in InputNumber component, when users type directly in input, the min, max is not working until it blurred
      field = (
        // Warning: The Precision represents as scale in antd's InputNumber,
        //          we need to use scale to set InputNumber's precision
        <InputNumber
          {...others}
          className={cx('customField')}
          precision={scale}
          {...numRange}
          style={{ minWidth: 200 }}
          onChange={value => onChange(id, value)}
        />
      );
      break;
    case PickList:
      field = (
        <Select          
          className={baseCls}
          onChange={value => _onChange(id, value)}
          {...others}
        >
          {options.map(option => <Option key={option.id}>{option.option_value}</Option>)}
        </Select>
      );
      break;
    case TextInput:
      field = (
        <Input
          className={baseCls}
          value={value}
          onChange={e => _onChange(id, e.target.value)}
          {...others}
        />
      );
      break;
    case Display:
      field = (
        <DisplayField
          className={baseCls}
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
    <Row className={cx('row')}>
      <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
        <span className={required ? cx('required') : ''}>
          {label}
        </span>
        {!helpText ? <Tooltip title={helpText}>
          <Icon
            size="small"
            type="question-circle"
            className={cx('helpIcon')}
          />
        </Tooltip> : <div className={cx('iconPlaceholder')} />}
      </Col>
      <Col xs={24} sm={16}>{field}</Col>
    </Row>
  );
};

CustomField.defaultProps = defaultProps;
CustomField.propTypes = propTypes;
export default CustomField;