import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Enums from 'utils/EnumsManager';
import { injectIntl, intlShape } from 'react-intl';
import { Input } from 'antd';
import { connect } from 'react-redux';

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
};

class ValueColumn__REFACTORED extends Component {
  renderElementByType = (type) => {
    const { onValueChange, onSearchIconClick } = this.props;

    switch (type) {
      case Email:
      case LongText:
      case TextInput:
      case NumberInput:
        return (
          <Input
            size="small"
            onChange={onValueChange}
          />
        );
      case PickList:
      case Lookup:
      case DateOnly:
      case DateTime:
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
        {(!record || !record.field) ? (
          <span className="filterMessage">
            {formatMessage({ id: `${i18n}.fieldColRequired` })}
          </span>
        ) : this.renderElementByType(record.field.type)}
      </Fragment>
    );
  }
}


ValueColumn__REFACTORED.defaultProps = defaultProps;
ValueColumn__REFACTORED.propTypes = propTypes;
export default connect()(injectIntl(ValueColumn__REFACTORED));
