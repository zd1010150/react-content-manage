import { Button, Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';


const defaultProps = {
  mergedRecord: {},
};
const propTypes = {
  intl: intlShape.isRequired,
  mergedRecord: PropTypes.shape({
    masterId: PropTypes.number,
  }).isRequired,
};


class Buttons extends Component {
  onCancelClick = $ => this.props.history.goBack()

  onMergeClick = $ => {
    const { mergedRecord } = this.props;
    // tryMergeLeads();
  }

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <Fragment>
        <Button
          className="lead-theme-btn mr-sm"
          size="small"
          onClick={this.onMergeClick}
        >
          <Icon size="small" type="save" />
          {formatMessage({ id: `${i18n}.merge` })}
        </Button>
        <Button
          size="small"
          onClick={this.onCancelClick}
        >
          <Icon size="small" type="close" />
          {formatMessage({ id: `${i18n}.cancel` })}
        </Button>
      </Fragment>
    );
  }
}


Buttons.defaultProps = defaultProps;
Buttons.propTypes = propTypes;
export default withRouter(injectIntl(Buttons));