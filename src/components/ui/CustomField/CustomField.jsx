import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, InputNumber, DatePicker } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
import moment from 'moment';

import { DisplayField, EmailInput } from './index';
import { getRange } from 'utils/common';
import Enums from 'utils/EnumsManager';

const defaultProps = {
  type: '',
  size: 'small',
};
const propTypes = {
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

const Fields = ({
  id,
  type,
  label,
  options,
  onChange,
  ...others,
}) => {

  const {
    Date,
    DateTime,
    Email,
    LongText,
    Lookup,
    Number,
    PickList,
    Text,
    Display,
  } = Enums.FieldTypes;

  let field = null;
  switch (type) {
    case Date:
      field = (
        <DatePicker
          {...others}
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
          id={id}
          onChange={onChange}
        />
      );
      break;
    case LongText:
      field = (
        <TextArea
          {...others}
          autosize={{minRows:2, maxRows:4}}
          onChange={e => onChange(id, e.target.value)}
        />
      );
      break;
    case Lookup:
      field = (
        <Select
          {...others}
          mode="combobox"
          style={{ width: '100%' }}
          onChange={values => onChange(id, values)}
        >
          {options.map(option => <Option key={option.id}>{option.value}</Option>)}
        </Select>
      );
      break;
    case Number:
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
          {...others}
          mode="tags"
          style={{ width: '100%' }}
          onChange={values => onChange(id, values)}
        >
          {options.map(option => <Option key={option.id}>{option.option_value}</Option>)}
        </Select>
      );
      break;
    case Text:
      field = (
        <Input
          {...others}
          onChange={e => onChange(id, e.target.value)}
        />
      );
      break;
    case Display:
      field = (
        <DisplayField
          {...others}
          label={'testabc'}
          helpText={'tooltip of test'}
          value={'test value'}
          isLocked={true}
          isValueChanged={true}
          onReloadClick={()=>console.log('clicking reload')}
          onDoubleClick={()=>console.log('on double click')}
        />
      );
      break;
    default:
      throw new Error('Type is not found.');
  }

  return (
    <div>
      {label && <label>{label}</label>}
      {field}
    </div>
  );
};

Fields.defaultProps = defaultProps;
Fields.propTypes = propTypes;
export default Fields;