import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, LeftActions, RightActions, Modal } from 'components/ui/index';
import TableWrapper from '../components/Table/index';
import { massUpdate, massDelete } from '../components/Table/flow/actions';

class LeadPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      visible: false,
    };
  }

  onMassUpdateClick = () => {
    this.setState({ visible: true });
    // load data
  }

  onMassDeleteClick = () => {
    const { selectedIds } = this.state;
    const { pagination, sorter } = this.props;
    const { current, pageSize } = pagination;
    const { orderBy, sortedBy } = sorter;
    this.props.massDelete(selectedIds, {
      current, pageSize, orderBy, sortedBy
    });
    // reset selectedIds
    this.setState({ selectedIds: [] });
  }

  onModalSaveClick = () => {
    this.setState({ visible: false });
    // update redux
  }

  onModalCancelClick = () => {
    this.setState({ visible: false });
  }

  onSelectChange = (selectedIds, records) => {
    this.setState({ selectedIds });
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
        onMassDeleteClick={this.onMassDeleteClick}
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
          <TableWrapper
            selectedIds={selectedIds}
            onSelectChange={this.onSelectChange}
          />
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
const mapStateToProps = ({ leads }) => ({
  pagination: leads.table.pagination,
  sorter: leads.table.sorter,
});
const mapDispatchToProp = {
  massUpdate,
  massDelete,
};
export default connect(mapStateToProps, mapDispatchToProp)(LeadPanel);