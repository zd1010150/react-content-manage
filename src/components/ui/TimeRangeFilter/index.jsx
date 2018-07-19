/**
 * TimeRangeFilter is introduced in View List in crm project due to new feature requirement.
 * This component is used to enhance the date/datetime filter functionalities with more saleforce-like functionalities.
 * @Features:
 * * Three modes can be selected to cater for more dynamic filter requirements,
 *   including 'Specific Date', 'Range', 'Custom Range'.
 * * 'Specific Date' allows user to choose a target date/datetime selected from calendar. A default functionality.
 * * 'Range' allows user to choose a quick range from 'TODAY', 'THIS WEEK', 'THIS MONTH' and maybe more in future.
 *   The result will be dynamically computed for users by each range.
 * * [FUTURE FEATURE] 'Custom Range' allows user to choose a customizable range by combining 'NEXT', 'LAST', a numeric value and one value from 'DAY', 'WEEK', 'MONTH'.
 *   e.g. NEXT 5 WEEKS. The result will be dynamically computed for users by each range.
 */

/* eslint-disable no-underscore-dangle */
import { Col, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Enums from 'utils/EnumsManager';
import CombinedSelection from './CombinedSelection';

const { DateTimeConfigs } = Enums;
const { SubTypesInArray } = DateTimeConfigs;
const { Option } = Select;


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  // TODO: custom prop check on subtypesinarray
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};


class TimeRangeFilter extends Component {
  componentDidMount() {}

  render() {
    console.warn(this.props);
    const {
      intl,
      value,      
      type,
      onChange,
      displayNum,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.DateTimeSubTypes';

    return (
      <Row gutter={8}>
        <Col lg={24} xl={6}>
          <Select
            className="full-width"
            size="small"
            onChange={subtype => onChange(displayNum, 'subtype', subtype)}
            value={type}
          >
            {SubTypesInArray.map(st => <Option key={st} value={st}>{formatMessage({ id: `${i18n}.${st}` })}</Option>)}
          </Select>
        </Col>
        <Col lg={24} xl={18}>
          <CombinedSelection
            displayNum={displayNum}
            type={type}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  }
}


TimeRangeFilter.defaultProps = defaultProps;
TimeRangeFilter.propTypes = propTypes;
export default injectIntl(TimeRangeFilter);
