import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, DatePicker, InputNumber, Icon } from 'antd';
import { getTimeSetting } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { TimeRangeFilter } from 'components/ui/index';

const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = Enums.FieldTypes;

const defaultProps = {
  handleAddonClick: null,
  handleTimeRangeChange: null,
  handleValueChange: null,
};
const propTypes = {
  displayNum: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleAddonClick: PropTypes.func,
  handleValueChange: PropTypes.func,
  handleTimeRangeChange: PropTypes.func,
};

const ValueCriteriaField = ({
  displayNum,
  type,
  handleValueChange,
  handleAddonClick,
  handleTimeRangeChange,
  value,
}) => {
  switch (type) {
    case DateOnly:
    case DateTime:
      const timeSetting = getTimeSetting(type);
      return (
        <TimeRangeFilter
          displayNum={displayNum}
          type={value.subtype}
          value={value.value}
          onChange={handleTimeRangeChange}
        />
      );
      // return (
      //   <DatePicker
      //     allowClear={false}
      //     className="full-width"
      //     size="small"
      //     format={timeSetting.format}
      //     showTime={type === DateTime}
      //     onChange={(date, dateString) => handleValueChange(dateString, displayNum)}
      //     // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
      //     // In this way we can use string outside, and only convert to certain time format in reducer.
      //     value={moment(value, timeSetting.format).isValid() ? moment(value, timeSetting.format) : undefined}
      //   />
      // );
    case NumberInput:
      // TODO: add scale and precision as restriction rules
      return (
        <InputNumber
          className="full-width"
          size="small"
          onChange={num => handleValueChange(num, displayNum)}
          value={value}
        />
      );
    case PickList:
    case Lookup:
      return (
        <Input
          size="small"
          addonAfter={<Icon type="search" onClick={e => handleAddonClick(displayNum)} />}
          onChange={e => handleValueChange(e.target.value, displayNum)}
          value={value}
        />
      );
    case Email:
    case LongText:
    case TextInput:
      return <Input size="small" onChange={e => handleValueChange(e.target.value, displayNum)} value={value} />;
    default:
      throw Error('No such type in ValueCriteriaField component.');
  }
};

ValueCriteriaField.defaultProps = defaultProps;
ValueCriteriaField.propTypes = propTypes;
export default ValueCriteriaField;
