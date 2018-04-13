import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Select, Input } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
import { Panel, LeftActions, RightActions, StyledModal } from 'components/ui/index';
import TableWrapper from '../components/Table/index';
import { massUpdate, massDelete } from '../components/Table/flow/actions';
import Enums from 'utils/EnumsManager';

class LeadPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      visible: false,
      selectedFieldId: '',
      selectedFieldInputValue: '',
    };
  }

  onMassUpdateClick = () => {
    this.setState({ visible: true });
    // load data
  }

  onMassDeleteClick = () => {
    const { selectedIds } = this.state;
    const { pagination, sorter, activeId } = this.props;
    const { current, pageSize } = pagination;
    const { orderBy, sortedBy } = sorter;
    this.props.massDelete(selectedIds, {
      current, pageSize, orderBy, sortedBy, activeId
    });
    // reset selectedIds
    this.setState({ selectedIds: [] });
  }

  onModalSaveClick = () => {
    const { pagination, sorter, activeId } = this.props;
    const { current, pageSize } = pagination;
    const { orderBy, sortedBy } = sorter;
    const { selectedIds, selectedFieldId, selectedFieldInputValue } = this.state;
    this.props.massUpdate(selectedIds, selectedFieldId, selectedFieldInputValue, {
      current, pageSize, orderBy, sortedBy, activeId
    });

    this.setState({ visible: false });
  }

  onModalCancelClick = () => {
    this.setState({ visible: false });
  }

  onSelectChange = (selectedIds, records) => {
    this.setState({ selectedIds });
  }

  onFieldChange = value => {
    console.log(value);
    this.setState({ selectedFieldId: value });
  }

  handleValueInputChangeByType = arg => {
    // arg will be synthetic event if type is text, number, longtext 
    // otherwise arg is string
    const newValue = _.isObject(arg) ? arg.target.value : arg;
    this.setState({ selectedFieldInputValue: newValue });
  }

  getValueInput = (selectedFieldId, columns) => {
    const targetColumn = columns.find(column => column.field_name === selectedFieldId);
    if (!targetColumn) return null;

    const { FieldTypes } = Enums;
    switch (targetColumn.crm_data_type) {
      case FieldTypes.Text:
        return <Input onChange={this.handleValueInputChangeByType} size="small" />;
      case FieldTypes.Number:
        return <Input type="number" onChange={this.handleValueInputChangeByType} size="small" />;
      case FieldTypes.LongText:
        return <TextArea autosize={{ minRows: 3, maxRows: 10 }} onChange={this.handleValueInputChangeByType} />;
      case FieldTypes.PickList:
        return (
          <Select onChange={this.handleValueInputChangeByType} size="small">
            {targetColumn.picklists.data.map(item => (
              <Option key={item.id} value={item.option_value}>{item.option_value}</Option>
            ))}
          </Select>
        );
      case FieldTypes.Lookup:
        // need to fetch the look up data and pass the selected item id to backend
      case FieldTypes.Date:
      case FieldTypes.DateTime:
      case FieldTypes.Email:
        return null;
    }
  }

  render() {
    const { selectedIds, visible, selectedFieldId } = this.state;
    const { theme, permissions, columns } = this.props;

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

    const valueField = this.getValueInput(selectedFieldId, columns);
    const valueFieldName = columns.find(col => col.field_name === selectedFieldId)
                            ? columns.find(col => col.field_name === selectedFieldId).field_label
                            : null;
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
        <StyledModal
          title="Mass Update"
          visible={visible}
          onOk={this.onModalSaveClick}
          onCancel={this.onModalCancelClick}
          selectedIds={selectedIds}
          columns={columns}
        >
          <Row>
            <Col sm={6} xs={24}>
              <label>Select Field</label>
            </Col>
            <Col sm={18} xs={24}>
              <Select style={{ width: '100%' }} size="small" onChange={this.onFieldChange} dropdownMatchSelectWidth={false}>
                {columns.map(column => (
                  <Option
                    key={column.field_name}
                    value={column.field_name}  // this will be passed into onChange
                  >
                    {column.field_label}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          {selectedFieldId ? (<Row style={{ marginTop: 5 }}>
            <Col sm={6} xs={24}><label>{valueFieldName}</label></Col>
            <Col sm={18} xs={24}>{valueField}</Col>
          </Row>) : null}
        </StyledModal>
      </Fragment>
    );
  }
}

// LeadPanel.defaultProps = defaultProps;
// LeadPanel.propTypes = propTypes;
const mapStateToProps = ({ leads }) => ({
  columns: leads.table.columns,
  pagination: leads.table.pagination,
  sorter: leads.table.sorter,
  activeId: leads.filter.activeId,
});
const mapDispatchToProp = {
  massUpdate,
  massDelete,
};
export default connect(mapStateToProps, mapDispatchToProp)(LeadPanel);