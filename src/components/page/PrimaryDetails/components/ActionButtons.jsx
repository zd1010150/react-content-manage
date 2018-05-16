import { notification } from 'antd';
import { FloatingActionButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { isValidClientTypes } from 'utils/propChecks';
import { resetAllFieldsValue, tryUpdateClient, tryUpdateAndAddClient } from '../flow/actions';

const { FieldTypes } = Enums;
const { TextInput, NumberInput } = FieldTypes;


const defaultProps = {
  accountId: '',
};
const propTypes = {
  intl: intlShape.isRequired,
  accountId: PropTypes.string,
  objectId: PropTypes.string.isRequired,
  objectType: isValidClientTypes,
};


class ActionButtons extends Component {
  handleSaveClick = () => {
    const {
      intl,
      accountId,
      objectId,
      objectType,
      tryUpdateClient,
      sections,
    } = this.props;
    const { formatMessage } = intl;

    // Check kinds of validations before save/update
    if (this.isAnyRequiredFieldInvalid(sections)) {
      notification.error({
        duration: 3,
        message: formatMessage({ id: 'global.errors.oneFieldRequired' }),
      });
    } else if (this.isAnyTextFieldInvalid(sections)
              || this.isAnyNumberFieldInvalid(sections)) {
      notification.error({
        duration: 3,
        message: formatMessage({ id: 'global.errors.exceedMaximumLength' }),
      });
    } else {
      tryUpdateClient(objectId, objectType, accountId);
    }
  }

  handleSaveAndNewClick = () => {
    const {
      accountId,
      objectId,
      objectType,
      tryUpdateAndAddClient,
    } = this.props;
    tryUpdateAndAddClient(objectId, objectType, accountId);
  }

  handleRevertClick = () => this.props.resetAllFieldsValue()

  handleGoBackClick = () => {
    const {
      history,
      accountId,
      objectType,
      match,
    } = this.props;
    const regex = /\/accounts\/\d+\/opportunities/;
    if (regex.test(match.url)) {
      return history.push(`/accounts/${accountId}`);
    }
    return history.push(`/${objectType}`);
  }

  isAnyNumberFieldInvalid = data => _.some(data, section => _.some(section.fields, field => field.type === NumberInput && field.value && String(field.value).length > field.precision))
  isAnyTextFieldInvalid = data => _.some(data, section => _.some(section.fields, field => field.type === TextInput && field.value && field.value.length > field.length))
  isAnyRequiredFieldInvalid = data => _.some(data, section => _.some(section.fields, field => field.required && field.value === ''))

  render() {
    const { objectType, theme } = this.props;

    return (
      <FloatingActionButtons
        objectType={objectType}
        theme={theme}
        onSaveClick={this.handleSaveClick}
        onSaveAndNewClick={this.handleSaveAndNewClick}
        onRevertClick={this.handleRevertClick}
        onGoBackClick={this.handleGoBackClick}
      />
    );
  }
}


ActionButtons.defaultProps = defaultProps;
ActionButtons.propTypes = propTypes;
const mapStateToProps = ({ global, clientDetails }) => ({
  language: global.language,
  sections: clientDetails.details.sections,
});
const mapDispatchToProps = {
  resetAllFieldsValue,
  tryUpdateClient,
  tryUpdateAndAddClient,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(ActionButtons)));
