import { Button, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import generator from 'generate-password';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { PlatformSettings, PortalSettings } from '../components/index';
import {
  reset,
  tryConvertLead,
  tryFetchLeadIfNeeded,
  tryFetchTypes,
} from '../flow/actions';

const { PhantomId } = Enums;

const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
};


class ConvertLeads extends Component {
  state = {
    accountNum: '',
    password: '',
    typeId: '',
    loginAccount: '',
    portalPassword: generator.generate(),
  }

  componentDidMount() {
    // fetch lead's email if needed
    const { objectId, tryFetchLeadIfNeeded, tryFetchTypes } = this.props;
    tryFetchLeadIfNeeded(objectId);
    tryFetchTypes();
  }

  componentDidUpdate() {
    const { history, success, newAccountId } = this.props;
    if (success && newAccountId) {
      history.push(`/accounts/${newAccountId}/tasks/${PhantomId}`);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onCancelClick = () => {
    const { history, objectId, objectType } = this.props;
    history.push(`/${objectType}/convert/find/${objectId}`);
  }

  onConvertClick = () => {
    const { email, objectId, tryConvertLead } = this.props;
    tryConvertLead(objectId, { email, ...this.state });
  }

  onFieldChange = (field, value) => this.setState({ [field]: value })

  render() {
    const {
      accountNum,
      password,
      typeId,
      portalPassword,
    } = this.state;
    const { intl, email, types } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.convertLeads';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.title` })}
        panelClasses="lead-theme-panel"
      >
        <PlatformSettings
          accountNum={accountNum}
          password={password}
          typeId={typeId}
          types={types}
          onChange={this.onFieldChange}
        />
        <PortalSettings
          loginAccount={email}
          portalPassword={portalPassword}
          onChange={this.onFieldChange}
        />
        <div>
          <Button
            className="lead-theme-btn mr-sm ml-lg mb-md"
            size="small"
            onClick={this.onConvertClick}
          >
            <Icon size="small" type="save" />
            {formatMessage({ id: 'global.ui.button.convertToAccount' })}
          </Button>
          <Button
            size="small"
            onClick={this.onCancelClick}
          >
            <Icon size="small" type="close" />
            {formatMessage({ id: 'global.ui.button.cancel' })}
          </Button>
        </div>
      </Panel>
    );
  }
}


ConvertLeads.propTypes = propTypes;
const mapStateToProps = ({ global, conversion }) => ({
  language: global.language,
  email: conversion.email,
  success: conversion.success,
  newAccountId: conversion.newAccountId,
  types: conversion.types,
});
const mapDispatchToProps = {
  reset,
  tryConvertLead,
  tryFetchLeadIfNeeded,  
  tryFetchTypes,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ConvertLeads)));
