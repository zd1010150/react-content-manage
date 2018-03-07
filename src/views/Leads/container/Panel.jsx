import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, LeftActions, RightActions, Modal } from 'components/ui/index';

class LeadPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [1],
      visible: false,
    }
  }

  onMassUpdateClick = () => {
    this.setState({ visible: true });
    // load data
  }

  onModalSaveClick = () => {
    this.setState({ visible: false });
    // update redux
  }

  onModalCancelClick = () => {
    this.setState({ visible: false });
  }

  render() {
    const { selectedIds, visible } = this.state;
    const { theme, permissions } = this.props;

    const leftActions = (
      <LeftActions
        theme={theme}
        selectedIds={selectedIds}
        permissions={permissions}
        onMassUpdateClick={this.onMassUpdateClick}
      />
    );
    const rightActions = (
      <RightActions
        theme={theme}
        permissions={permissions}
      />
    );

    return (
      <Fragment>
        <Panel
          panelClasses={`${theme}-theme-panel`}
          actionsLeft={leftActions}
          actionsRight={rightActions}
        >
          this is test
        </Panel>
        <Modal
          title="Mass Update"
          visible={visible}
          onOk={this.onModalSaveClick}
          onCancel={this.onModalCancelClick}
        >
          testing
        </Modal>
      </Fragment>
    );
  }
}

// LeadPanel.defaultProps = defaultProps;
// LeadPanel.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
};
export default connect(mapStateToProps)(LeadPanel);