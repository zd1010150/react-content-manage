import { FilterCriteria } from 'components/page/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import {
  setConditionLogic,
  addFilter,
  changeFilterByColumn,
  removeFilter,
  setSiderOptions,
  setSiderSelection,
  syncSiderSelection,
  fetchLookupValuesById,
  insertSiderSelectionToField,
} from './flow/actions';


const defaultProps = {
  siderCollapsed: true,
};
const propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
};

class FilterCriteriaWrapper extends Component {
  onFieldChange = (fieldId, displayNum) => {
    const { fields, changeFilterByColumn } = this.props;
    const field = fields.find(field => field.id === fieldId);
    if (field) {
      return changeFilterByColumn(displayNum, 'type', field.crm_data_type, fieldId);
    }
  }

  onConditionChange = (conditionId, displayNum) => this.props.changeFilterByColumn(displayNum, 'conditionId', conditionId)

  onFilterValueChange = (displayNum, value) => this.props.changeFilterByColumn(displayNum, 'value', value)

  onRemoveFilter = displayNum => this.props.removeFilter(displayNum)

  onAddFilter = () => this.props.addFilter()

  onLogicChange = value => this.props.setConditionLogic(value)

  onAddonClick = (displayNum) => {
    const {
      filters,
      fields,
      setSiderOptions,
      setSiderSelection,
      fetchLookupValuesById,
      toggleRightSider,
    } = this.props;
    const filter = filters.find(filter => filter.displayNum === displayNum);
    
    // If type is Lookup, then fetch available values of this field.
    // !!! The rule may change in future for better performance and avoid unnecessary fetch
    // TODO: Optimize fetching
    const { fieldId, type } = filter;
    const { Lookup, PickList } = Enums.FieldTypes;
    if (type === Lookup) {
      fetchLookupValuesById(displayNum, fieldId);
    } else if (type === PickList) {
      const field = fields.find(field => field.id === fieldId);
      setSiderOptions(displayNum, field.picklists);
      setSiderSelection();
    }
    return toggleRightSider(false);
  }

  onSiderClose = $ => this.props.toggleRightSider(true)

  onSiderValuesChange = checkedIds => this.props.syncSiderSelection(checkedIds)

  onInsertSelection = $ => this.props.insertSiderSelectionToField()

  render() {
    const {
      match,
      logicText,
      filters,
      fields,
      conditions,
      siderCollapsed,
      siderFieldId,
      siderOptions,
      siderSelection,
    } = this.props;

    const { objectType } = match.params;
    const theme = getThemeByType(objectType);

    return (
      <FilterCriteria
        theme={theme}
        fields={fields}
        conditions={conditions}
        filters={filters}
        handleFieldChange={this.onFieldChange}
        handleConditionChange={this.onConditionChange}
        handleValueChange={this.onFilterValueChange}
        handleFilterRemove={this.onRemoveFilter}
        handleAddNewClick={this.onAddFilter}
        handleAddonClick={this.onAddonClick}
        handleSiderClose={this.onSiderClose}
        handleSiderValuesChange={this.onSiderValuesChange}
        handleInsertSelection={this.onInsertSelection}
        siderCollapsed={siderCollapsed}
        siderFieldId={siderFieldId}
        siderOptions={siderOptions}
        siderSelection={siderSelection}
        logicText={logicText}
        handleLogicChange={this.onLogicChange}
      />
    );
  }
}

FilterCriteriaWrapper.defaultProps = defaultProps;
FilterCriteriaWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectView, ui }) => ({
  conditions: global.settings.conditions,
  logicText: objectView.filterCriteria.condition_logic,
  filters: objectView.filterCriteria.filters,
  fields: objectView.fields.allFields,
  siderCollapsed: ui.rightSider.collapsed,
  siderFieldId: objectView.filterCriteria.siderFieldId,
  siderOptions: objectView.filterCriteria.siderOptions,
  siderSelection: objectView.filterCriteria.siderSelection,
});
const mapDispatchToProps = {
  setConditionLogic,
  addFilter,
  changeFilterByColumn,
  removeFilter,
  setSiderOptions,
  setSiderSelection,
  syncSiderSelection,
  insertSiderSelectionToField,
  fetchLookupValuesById,
  toggleRightSider,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterCriteriaWrapper));