import { DatePicker, InputNumber, Select } from 'antd';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';
import './index.css';

const { DateTimeConfigs } = Enums;
const { SubTypes, RangesInArray, PeriodPrefixsInArray, PeriodTypesInArray } = DateTimeConfigs;
const { SpecificDate, Range, CustomRange } = SubTypes;
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};


const CombinedSelection = ({
  intl,
  displayNum,
  type,
  value,
  onChange,
}) => {
  const { formatMessage } = intl;
  const i18n = 'global.ui';

  switch (type) {    
    case SpecificDate:
      return (
        <DatePicker
          className="full-width"
          size="small"
          // format={timeSetting.format}
          // showTime={type === DateTime}
          // onChange={(date, dateString) => handleValueChange(dateString, displayNum)}
          // // The Datepicker component needs a moment object for 'value' property, so we do the transfer here.
          // // In this way we can use string outside, and only convert to certain time format in reducer.
          // value={moment(value, timeSetting.format).isValid() ? moment(value, timeSetting.format) : undefined}
        />
      );
    case Range:
      const rangeI18n = `${i18n}.DateTimeRanges`;
      return (
        <Select
          className="full-width"
          size="small"
          onChange={range => onChange(displayNum, 'value', range)}
        >
          {RangesInArray.map(rg => <Option key={rg} value={rg}>{formatMessage({ id: `${rangeI18n}.${rg}` })}</Option>)}
        </Select>
      );
    case CustomRange:
      const prefixI18n = `${i18n}.DateTimePeriodPrefixs`;
      const typeI18n = `${i18n}.DateTimePeriodTypes`;
      const defaultConfigs = {
        className: 'full-width',
        size: 'small',
      };
      return (
        <Fragment>
          <div className="prefixBox full-width">
            <Select
              {...defaultConfigs}
            >
              {PeriodPrefixsInArray.map(pp => <Option key={pp} value={pp}>{formatMessage({ id: `${prefixI18n}.${pp}` })}</Option>)}
            </Select>
          </div>
          <div className="rangeBox">
            <InputNumber
              {...defaultConfigs}
              // NOTES: Parser func will be triggered before each onChange, i.e. a converted value pass in onChange
              onChange={(num) => {
                if (value !== num) {
                  // TODO: dispatch event to update record
                }
              }}
              parser={num => (num ? parseInt(num, 10) : 1)}
              min={1}
            />
          </div>
          <div className="prefixBox full-width">
            <Select
              {...defaultConfigs}
            >
              {PeriodTypesInArray.map(pt => <Option key={pt} value={pt}>{formatMessage({ id: `${typeI18n}.${pt}` })}</Option>)}
            </Select>
          </div>
        </Fragment>
      );
    default:
      return null;
  }
};


CombinedSelection.defaultProps = defaultProps;
CombinedSelection.propTypes = propTypes;
export default injectIntl(CombinedSelection);
