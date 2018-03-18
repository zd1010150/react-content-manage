import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, DatePicker } from 'antd';
const { TextArea } = Input;

import { DisplayField, EmailInput } from './index';
import Enums from 'utils/EnumsManager';

import moment from 'moment';

const defaultProps = {
  type: '',
};
const propTypes = {
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
};

const Fields = ({ type, value, label, onChange }) => {
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

  const size = 'small';
  let field = null;
  switch (type) {
    case Date:
      field = <DatePicker size={size} format="YYYY-MM-DD" value={moment(value)} />;
      break;
    case DateTime:
      field = <DatePicker size={size} format="YYYY-MM-DD HH:mm:ss" value={moment(value)} showTime />;
      break;
    case Email:
      field = <EmailInput size={size} message="wrong format" />;
      break;
    case LongText:
      field = <TextArea size={size} autosize={{minRows:2, maxRows:4}} />;
      break;
    case Lookup:
      field = <DatePicker size={size} />;
      break;
    case Number:
      field = <DatePicker size={size} />;
      break;
    case PickList:
      field = <DatePicker size={size} />;
      break;
    case Text:
      field = <Input size={size} />;
      break;
    case Display:
      field = (<DisplayField
                label={'testabc'}
                helpText={'tooltip of test'}
                value={'test value'}
                isLocked={true}
                isValueChanged={true}
                onReloadClick={()=>console.log('clicking reload')}
                onDoubleClick={()=>console.log('on double click')}/>);
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