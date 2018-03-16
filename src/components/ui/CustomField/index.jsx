import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, DatePicker } from 'antd';
const { TextArea } = Input;

import Enums from 'utils/EnumsManager';

const defaultProps = {
  type: '',
  label: 'default label'
};
const propTypes = {
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
};

const Fields = ({ type, value, label }) => {
  const {
    Date,
    DateTime,
    Email,
    LongText,
    Lookup,
    Number,
    PickList,
    Text
  } = Enums.FieldTypes;

  const size = 'small';
  let field = null;
  switch (type) {
    case Date:
      field = <DatePicker size={size} />;
      break;
    case DateTime:
      field = <DatePicker size={size} />;
      break;
    case Email:
      field = <DatePicker size={size} />;
      break;
    case LongText:
      field = <TextArea size={size} minRows={2} maxRows={4} />;
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
    default:
      console.log('type is not found.');
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