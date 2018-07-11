import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, DatePicker, InputNumber, Icon } from 'antd';
import { getTimeSetting } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';


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


const propTypes = {
  displayNum: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  handleValueChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  dateFormat: PropTypes.string,
  datetimeFormat: PropTypes.string,
};

// TODO: replace the hardcoded date and datetime formats with user info
const ValueCriteriaField = ({
  displayNum,
  type,
  handleValueChange,
  handleAddonClick,
  value,
}) => {
  const ValueData = getTimeSetting(DateTime);
  switch (type) {
    case DateOnly:
    case DateTime:
      return (
        <DatePicker
          allowClear={false}
          style={{ width: '100%' }}
          size="small"
          format={getTimeSetting(type).format}
          showTime={type === DateTime}
          onChange={(date, dateString) => handleValueChange(dateString, displayNum)}
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          value={moment(value, ValueData.format).isValid() ? moment(value, ValueData.format) : undefined}
        />
      );
    case NumberInput:
      // TODO: add scale and precision as restriction rules
      return (
        <InputNumber
          style={{ width: '100%' }}
          size="small"
          onChange={value => handleValueChange(displayNum, value)}
          value={value}
        />
      );
    case PickList:
    case Lookup:
      return (
        <Input
          size="small"
          addonAfter={<Icon type="search" onClick={e => handleAddonClick(displayNum)} />}
          onChange={e => handleValueChange(displayNum, e.target.value)}
          value={value}
        />
      );
    case Email:
    case LongText:
    case TextInput:
      return <Input size="small" onChange={e => handleValueChange(displayNum, e.target.value)} value={value} />;
    default:
      throw Error('No such type in ValueCriteriaField component.');
  }
};

ValueCriteriaField.propTypes = propTypes;
export default ValueCriteriaField;