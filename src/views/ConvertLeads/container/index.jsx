import { Button, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import generator from 'generate-password';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PlatformSettings, PortalSettings } from '../components/index';
import { tryConvertLead, tryFetchLeadIfNeeded } from '../flow/actions';

const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
};


class ConvertLeads extends Component {
  state = {
    accountNum: '',
    password: '',
    type: '',
    types: [],
    loginAccount: '',
    portalPassword: generator.generate(),
  }

  componentDidMount() {
    // fetch lead's email if needed
    const { objectId, tryFetchLeadIfNeeded } = this.props;
    tryFetchLeadIfNeeded(objectId);
    // random generate password
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
      type,
      types,
      portalPassword,
    } = this.state;
    const { intl, email } = this.props;
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
          type={type}
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
});
const mapDispatchToProps = {
  tryFetchLeadIfNeeded,
  tryConvertLead,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ConvertLeads)));
