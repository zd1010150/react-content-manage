/**
 * AutoConvertedDatePicker is a component used to convert date/time string to application time format.
 * This component is wrapped based on DatePicker from Ant Design. Please refer to https://ant.design/components/date-picker/
 * @Features:
 * * Support both date and time picker by default.
 * * Convert date/time automatically based on the time format set in the application.
 * * onChange is exposed for specific state/redux actions.
 * * Accept all available props for DatePicker component.
 */

import { DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { getTimeSetting } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';

const { FieldTypes } = Enums;
const { DateOnly, DateTime } = FieldTypes;
// Get datetime format and offset from localstorage. The values are consistent with Company Setup in application.
const timeSetting = getTimeSetting();


const defaultProps = {
  type: DateOnly,
  onChange: null,
  value: '',
};
const propTypes = {
  // TODO: Add custom date related prop checks
  type: PropTypes.oneOf([DateOnly, DateTime]),
  onChange: PropTypes.func,
  value: PropTypes.string,
};

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
    // NOTES:
    // We use string value to pass between redux and component props, it's easy to manipulate and convert with lower cost in memory.
    value={moment(value, timeSetting.format).isValid()
            ? moment(value, timeSetting.format)
            : undefined}
    {...others}
  />
);

AutoConvertedDatePicker.defaultProps = defaultProps;
AutoConvertedDatePicker.propTypes = propTypes;
export default AutoConvertedDatePicker;
