import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Enums from 'utils/EnumsManager';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { TimeRangeFilter } from 'components/ui/index';

const { FieldTypes } = Enums;
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = FieldTypes;


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  // TODO: add record prop check
  record: PropTypes.object.isRequired,
};

class ValueColumn extends Component {
  renderElementByType = (type) => {
    const {
      record,
      onValueChange,
      onSearchIconClick,
    } = this.props;
    const { value, rangeValue, subtype } = record;

    switch (type) {
      case Email:
      case LongText:
      case TextInput:
      case NumberInput:
        // TODO: Number input can be enhanced with a InputNumber component if needed
        // TODO: to reducer times to render/sync with redux, use onBlur instead of onChange
        return (
          <Input
            size="small"
            onChange={e => onValueChange(type, e.target.value)}
            value={value}
          />
        );
      case PickList:
      case Lookup:
        return (
          <Input
            size="small"
            onChange={e => onValueChange(type, e.target.value)}
            addonAfter={
              <Icon
                className="cursor-pointer"
                type="search"
                onClick={onSearchIconClick}
              />
            }
            value={value}
          />
        );
      case DateOnly:
      case DateTime:
        return (
          <TimeRangeFilter
            type={type}
            subtype={subtype}
            onSubtypeChange={newSubtype => onValueChange(newSubtype, null)}
            onValueChange={newValue => onValueChange(subtype, newValue)}
            value={rangeValue}
          />
        );
      default:
        console.warn('No supported field type can be found!');
        return null;
    }
  }
  render() {
    const { intl, record } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.errors';

    return (
      <Fragment>
        {record.field === null ? (
          <span className="filterMessage">
            {formatMessage({ id: `${i18n}.fieldColRequired` })}
          </span>
        ) : this.renderElementByType(record.field.type)}
      </Fragment>
    );
  }
}


ValueColumn.defaultProps = defaultProps;
ValueColumn.propTypes = propTypes;
export default connect()(injectIntl(ValueColumn));
