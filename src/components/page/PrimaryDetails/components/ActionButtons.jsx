import { FloatingActionButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isValidClientTypes } from 'utils/propChecks';
import { resetAllFieldsValue, tryUpdateClient, tryUpdateAndAddClient } from '../flow/actions';

const propTypes = {
  intl: intlShape.isRequired,
  accountId: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: isValidClientTypes,
};

class ActionButtons extends Component {
  handleSaveClick = () => {
    console.log(' save click ');
    const {
      accountId,
      objectId,
      objectType,
      tryUpdateClient,
    } = this.props;
    tryUpdateClient(objectId, objectType, accountId);
  }

  handleSaveAndNewClick = () => {
    console.log(' save and new click ');
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


ActionButtons.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = {
  resetAllFieldsValue,
  tryUpdateClient,
  tryUpdateAndAddClient,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ActionButtons)));
