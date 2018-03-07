import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, LeftActions, RightActions } from 'components/ui/index';

class LeadPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
    }
  }

  render() {
    const { selectedIds } = this.state;

    const { theme, permissions } = this.props;

    const leftActions = (
      <LeftActions
        theme={theme}
        selectedIds={selectedIds}
        permissions={permissions}
      />
    );
    const rightActions = (
      <RightActions
        theme={theme}
        selectedIds={selectedIds}
        permissions={permissions}
      />
    );

    return (
      <Panel
        panelClasses={`${theme}-theme-panel`}
        actionsLeft={leftActions}
        actionsRight={rightActions}
      >
        this is test
      </Panel>
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