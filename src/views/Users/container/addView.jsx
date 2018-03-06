/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';

class addEditView extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Panel panelTitle={this.props.actionType}>
        <TeamTree />
      </Panel>
    );
  }
}
addEditView.propTypes = {
  intl: intlShape.isRequired,
  actionType: PropTypes.string.isRequired,
};

export default injectIntl(addEditView);
