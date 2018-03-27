import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Row, Col } from 'antd';

import Enums from 'utils/EnumsManager';
import { FilterCriteria } from 'components/page/index';
import { FloatingLabelInput, Criterion, CriteriaHeader } from 'components/ui/index';
import {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeFilter,
} from './flow/actions';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class FilterCriteriaWrapper extends Component {
  handleLogicChange = value => this.props.setConditionLogic(value)

  addFilter = e => this.props.addFilter()

  onRemoveFilter = e => this.props.removeFilter(e.target.dataset.displayNum)

  handleConditionChange = (conditionId, display_num) => this.props.changeFilter(display_num, 'condition', conditionId)

  handleFieldChange = (fieldId, display_num) => {
    const { allFields, changeFilter } = this.props;
    const field = allFields.find(field => field.id === fieldId);
    if (field) {
      changeFilter(display_num, 'type', field.crm_data_type, fieldId);
    }
  }

  handleFilterValueChange = () => {
    console.log('changing the value');
  }

  render() {
    const {
      logicText,
      filters,
      allFields,
      conditions,
      intl,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.objectFilter.criteria';

    return (
      <Fragment>
        <CriteriaHeader />
        {filters.map(filter => {
          const { id, display_num, type } = filter;
          let options;
          if (type === Enums.FieldTypes.PickList) {
            const field = allFields.find(field => field.id === id);
            if (field) {
              options = field.picklists;
            }
          }
          return (
            <Criterion
              key={display_num}
              displayNum={display_num}
              onRemoveFilter={this.onRemoveFilter}
              fieldType={type}
              allFields={allFields}
              conditions={conditions}
              handleFieldChange={this.handleFieldChange}
              handleConditionChange={this.handleConditionChange}
              options={options}
            />
          );
        })}
        {/* test new common component */}
        <FilterCriteria
          handleAddNewClick={this.addFilter}
          logicText={logicText}
          handleLogicChange={this.handleLogicChange}
        />
      </Fragment>
    );
  }
}

FilterCriteriaWrapper.defaultProps = defaultProps;
FilterCriteriaWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  conditions: global.settings.conditions,
  logicText: objectView.filterCriteria.condition_logic,
  filters: objectView.filterCriteria.filters,
  allFields: objectView.fields.allFields,
});
const mapDispatchToProps = {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FilterCriteriaWrapper));