/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';


class addEditView extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Panel panelTitle={this.props.actionType}>
        edit
      </Panel>
    );
  }
}
addEditView.propTypes = {
  intl: intlShape.isRequired,
  actionType: PropTypes.string.isRequired,
};

export default injectIntl(addEditView);
