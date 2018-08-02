import { InputNumber, Select } from 'antd';
import { AutoConvertedDatePicker } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';
import './index.css';

const { DateTimeConfigs } = Enums;
const { SubTypes, RangesInArray, PeriodPrefixsInArray, PeriodTypesInArray } = DateTimeConfigs;
const { SpecificDate, Range, CustomRange } = SubTypes;
const { Option } = Select;


const defaultProps = {
  onChange: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  subtype: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};


const CombinedSelection = ({
  intl,
  subtype,
  type,
  value,
  onChange,
}) => {
  const { formatMessage } = intl;
  const i18n = 'global.ui';

  switch (subtype) {
    case SpecificDate:
      return (
        <AutoConvertedDatePicker
          type={type}
          value={value}
          onChange={(date, dateString) => onChange(dateString)}
        />
      );
    case Range:
      const rangeI18n = `${i18n}.DateTimeRanges`;
      return (
        <Select
          className="full-width"
          placeholder={formatMessage({ id: `${i18n}.placeholders.range` })}
          size="small"
          onChange={onChange}
          value={value}
        >
          {RangesInArray.map(rg => <Option key={rg} value={rg}>{formatMessage({ id: `${rangeI18n}.${rg}` })}</Option>)}
        </Select>
      );
    // NOTES:
    // The following case is not finished. It's an extended feature for this filter.
    // The following part only includes UI code.
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
