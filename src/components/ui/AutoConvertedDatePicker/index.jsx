import React from 'react';
import { DatePicker } from 'antd';
import { getTimeSetting } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import moment from 'moment';

const { FieldTypes } = Enums;
const { DateTime } = FieldTypes;

const timeSetting = getTimeSetting();

const AutoConvertedDatePicker = ({
  type,
  onChange,
  value,
  ...others
}) => (
  <DatePicker
    className="full-width"
    size="small"
    format={timeSetting.format}
    showTime={type === DateTime}
    onChange={onChange}
    // // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
    // // In this way we can use string outside, and only convert to certain time format in reducer.
    value={moment(value, timeSetting.format).isValid() ? moment(value, timeSetting.format) : undefined}
    {...others}
  />
);

export default AutoConvertedDatePicker;
