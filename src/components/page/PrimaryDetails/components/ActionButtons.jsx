import { notification } from 'antd';
import { FloatingActionButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isValidClientTypes } from 'utils/propChecks';
import { resetAllFieldsValue, tryUpdateClient, tryUpdateAndAddClient } from '../flow/actions';


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
    if (this.isDetailsValid(sections)) {
      tryUpdateClient(objectId, objectType, accountId);
    } else {
      notification.error({
        duration: 3,
        message: formatMessage({ id: 'global.errors.oneFieldRequired' }),
      });
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

  isDetailsValid = (data) => {
    let isValid = true;
    data.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && field.value === '') {
          isValid = false;
        }
      });
    });
    return isValid;
  }

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
