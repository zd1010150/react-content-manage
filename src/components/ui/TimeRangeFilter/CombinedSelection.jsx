import { DatePicker, Select } from 'antd';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';

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
  type,
  value,
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
          defaultValue={RangesInArray[0]}
          // onChange={this._onSubTypeChange}
        >
          {RangesInArray.map(rg => <Option key={rg} value={rg}>{formatMessage({ id: `${rangeI18n}.${rg}` })}</Option>)}
        </Select>
      );
    case CustomRange:
      const prefixI18n = `${i18n}.DateTimePeriodPrefixs`;
      const typeI18n = `${i18n}.DateTimePeriodTypes`;
      return (
        <Fragment>
          <div style={{maxWidth: '70px'}}>
            <Select
              className="full-width"
              size="small"
            >
              {PeriodPrefixsInArray.map(pp => <Option key={pp} value={pp}>{formatMessage({ id: `${prefixI18n}.${pp}` })}</Option>)}
            </Select>
          </div>
          <div></div>
          <div style={{maxWidth: '70px'}}>
            <Select
              className="full-width"
              size="small"
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
