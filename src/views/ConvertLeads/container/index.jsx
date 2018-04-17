import { Button, Icon, Select } from 'antd';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { PlatformSettings, PortalSettings } from '../components/index';
const { Option } = Select;


const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.number.isRequired,
};


class ConvertLeads extends Component {
  state = {
    convertSuccess: false,
    accountNum: '',
    password: '',
    type: '',
    types: [],
    loginAccount: '',
    portalPassword: '',
  }

  onCancelClick = $ => this.props.history.goBack()

  onFieldChange = (field, value) => this.setState({ [field]: value })

  render() {
    const {
      convertSuccess,
      accountNum,
      password,
      type,
      types,
      loginAccount,
      portalPassword,
    } = this.state;
    const { intl } = this.props;
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
          loginAccount={loginAccount}
          portalPassword={portalPassword}
          onChange={this.onFieldChange}
        />
        <div>
          <Button
            className="lead-theme-btn mr-sm ml-lg mb-md"
            size="small"
            onClick={this.onMergeClick}
          >
            <Icon size="small" type="save" />
            {formatMessage({ id: `global.ui.button.convertToAccount` })}
          </Button>
          <Button
            size="small"
            onClick={this.onCancelClick}
          >
            <Icon size="small" type="close" />
            {formatMessage({ id: `global.ui.button.cancel` })}
          </Button>
        </div>
      </Panel>
    );
  }
}


ConvertLeads.propTypes = propTypes;
export default withRouter(injectIntl(ConvertLeads));