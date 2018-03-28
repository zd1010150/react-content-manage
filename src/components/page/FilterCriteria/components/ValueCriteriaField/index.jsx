import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, DatePicker, InputNumber, Icon } from 'antd';

import Enums from 'utils/EnumsManager';

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
  dateFormat = 'YYYY-MM-DD',
  datetimeFormat = 'YYYY-MM-DD HH:mm:ss',
}) => {

  const { FieldTypes } = Enums;
  switch (type) {
    case FieldTypes.Date:
    case FieldTypes.DateTime:
      return (
        <DatePicker
          allowClear={false}
          style={{ width: '100%' }}
          size="small"
          format={type === FieldTypes.DateTime ? datetimeFormat : dateFormat}
          showTime={type === FieldTypes.DateTime}
          onChange={(date, dateString) => handleValueChange(displayNum, dateString)}
          // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // In this way we can use string outside, and only convert to certain time format in reducer.
          value={moment(value ? value : Date.now())}
        />
      );
    case FieldTypes.Number:
      // TODO: add scale and precision as restriction rules
      return (
        <InputNumber
          style={{ width: '100%' }}
          size="small"
          onChange={value => handleValueChange(displayNum, value)}
        />
      );
    case FieldTypes.PickList:
      // TODO: replace with a customized component to enable select value from right side bar
      return (
        <Input
          size="small"
          addonAfter={<Icon type="search" onClick={e => handleAddonClick(displayNum, type)} />}
          onChange={e => handleValueChange(displayNum, e.target.value)}
          value={value}
        />
      );
    case FieldTypes.Lookup:
      // TODO: replace with a customized component to enable select value from right side bar
      return <Input size="small" onChange={e => handleValueChange(displayNum, e.target.value)} value={value} />;
    case FieldTypes.Email:
    case FieldTypes.LongText:
    case FieldTypes.Text:
      return <Input size="small" onChange={e => handleValueChange(displayNum, e.target.value)} value={value} />;
    default:
      throw Error('No such type in ValueCriteriaField component.');
  }
};

ValueCriteriaField.propTypes = propTypes;
export default ValueCriteriaField;