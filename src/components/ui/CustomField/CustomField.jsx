import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, InputNumber, DatePicker } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

import { DisplayField, EmailInput } from './index';
import Enums from 'utils/EnumsManager';

import moment from 'moment';

const defaultProps = {
  type: '',
  size: 'small',
};
const propTypes = {
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

// all props
// type, defaultValue, value, label, onChange, size
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
          format="YYYY-MM-DD"
          onChange={(date, dateString) => onChange(id, date, dataString)}
          {...others}
        />
      );
      break;
    case DateTime:
      field = (
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(date, dateString) => onChange(id, date, dataString)}
          showTime
          {...others}
        />
      );
      break;
    case Email:
      field = (
        <EmailInput
          message="wrong format"
          {...others}
        />
      );
      break;
    case LongText:
      field = (
        <TextArea
          autosize={{minRows:2, maxRows:4}}
          onChange={e => onChange(id, e.target.value)}
          {...others}
        />
      );
      break;
    case Lookup:
      field = (
        <Select
          mode="combobox"
          style={{ width: '100%' }}
          onChange={values => onChange(id, values)}
          {...others}
        >
          {options.map(option => <Option key={option.id}>{option.value}</Option>)}
        </Select>
      );
      break;
    case Number:
      field = (
        <InputNumber
          onChange={e => onChange(id, e.target.value)}
          {...others}
        />
      );
      break;
    case PickList:
      field = (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={values => onChange(id, values)}
          {...others}
        >
          {options.map(option => <Option key={option.id}>{option.option_value}</Option>)}
        </Select>
      );
      break;
    case Text:
      field = (
        <Input
          onChange={e => onChange(id, e.target.value)}
          {...others}
        />
      );
      break;
    case Display:
      field = (
        <DisplayField
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