import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConvertDetailsView from './view';
import { tryFetchOwner, setFieldValue } from '../flow/actions';


const defaultProps = {
  tryFetchOwner: null,
  setFieldValue: null,
};
const propTypes = {
  owners: PropTypes.array.isRequired,
  accountStatuses: PropTypes.array.isRequired,
  similarAccounts: PropTypes.array.isRequired,
  tryFetchOwner: PropTypes.func,
  setFieldValue: PropTypes.func,
};


class ConvertDetails extends Component {
  componentDidMount() {
    const { objectId, tryFetchOwner } = this.props;
    tryFetchOwner(objectId);
  }

  handleFieldsChange = (name, value, extraValue) => this.props.setFieldValue(name, value, extraValue)

  render() {
    const {
      ownerId,
      owners,
      opportunityName,
      withoutNewOpportunity,
      createAccountName,
      createAccountNameId,
      accountStatusId,
      accountStatuses,
      similarAccounts,
    } = this.props;
    return (
      <ConvertDetailsView
        owner={{ value: ownerId }}
        owners={owners}
        opportunityName={{ value: opportunityName }}
        withoutNewOpportunity={{ value: withoutNewOpportunity }}
        accountStatus={{ value: accountStatusId }}
        accountStatuses={accountStatuses}
        createAccountName={{ value: createAccountName }}
        createAccountNameId={createAccountNameId}
        similarAccounts={similarAccounts}
        handleFieldsChange={this.handleFieldsChange}
      />
    );
  }
}


const mapStateToProps = ({ global, convertDetails }) => ({
  language: global.language,
  ownerId: convertDetails.ownerId,
  owners: convertDetails.owners,
  opportunityName: convertDetails.opportunityName,
  withoutNewOpportunity: convertDetails.withoutNewOpportunity,
  createAccountName: convertDetails.createAccountName,
  createAccountNameId: convertDetails.createAccountNameId,
  accountStatusId: convertDetails.accountStatusId,
  accountStatuses: convertDetails.accountStatuses,
  similarAccounts: convertDetails.similarAccounts,
});
const mapDispatchToProps = {
  tryFetchOwner,
  setFieldValue,
};
ConvertDetails.defaultProps = defaultProps;
ConvertDetails.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConvertDetails);
