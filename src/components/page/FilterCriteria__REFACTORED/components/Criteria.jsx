/**
 * Criteria is used to wrap Criterion UI component, with controls to redux and render.
 */
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import { Criterion } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  removeCriterionByDisplayNum,
  setCriterionByColumn,
  fetchOptionsIfNeeded,
} from '../flow/actions';
import { getConditionsByFieldType, shouldConditionDisabled } from '../utils/compUtils';
import CriteriaHeader from './CriteriaHeader';
import Sider from './Sider';
import ValueColumn from './ValueColumn';


const defaultProps = {
  setCriterionByColumn: null,
};
const propTypes = {
  criteria: PropTypes.arrayOf(PropTypes.shape({
    displayNum: PropTypes.number.isRequired,
    fieldId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    conditionId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.string,
    field: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      lookupKey: PropTypes.string.isRequired,
    }),
    options: PropTypes.array,
    subtype: PropTypes.string,
    rangeValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })).isRequired,
  fields: PropTypes.array.isRequired,
  setCriterionByColumn: PropTypes.func,
};

class Criteria extends Component {
  // TODO: clean up
  handleFilterFieldChange = (displayNum, newValue) => {
    console.log(`field change ${displayNum} -=- ${newValue}`);
    this.props.setCriterionByColumn('field', displayNum, newValue);
  }
  handleFilterConditionChange = (displayNum, newValue) => {
    console.log(`condition change ${displayNum} -=- ${newValue}`);
    this.props.setCriterionByColumn('condition', displayNum, newValue);
  }
  handleFilterValueChange = (displayNum, newValue, newSubtype) => {
    console.log(`value change ${displayNum} -=- ${newValue} -=- ${newSubtype}`);
    this.props.setCriterionByColumn('value', displayNum, newValue, newSubtype);
  }
  handleFilterDeleteClick = (displayNum) => {
    console.log(`deleting -=- ${displayNum}`);
    this.props.removeCriterionByDisplayNum(displayNum);
  }
  handleSearchIconClick = (criterion) => {
    this.props.toggleRightSider(false);
    this.props.fetchOptionsIfNeeded(criterion);
  }

  render() {
    const { criteria, conditions, fields } = this.props;
    return (
      <Fragment>
        <CriteriaHeader />
        {criteria.map(c => (
          <Criterion
            key={c.displayNum}
            displayNum={c.displayNum}
            fieldId={c.fieldId}
            conditionId={c.conditionId}
            shouldConditionDisabled={shouldConditionDisabled(c.subtype)}
            availableFields={fields}
            availableConditions={getConditionsByFieldType(
              c.field ? c.field.type : null,
              conditions,
            )}

            onFilterFieldChange={newValue => this.handleFilterFieldChange(c.displayNum, newValue)}
            onFilterConditionChange={newValue => this.handleFilterConditionChange(c.displayNum, newValue)}            
            onFilterDeleteClick={() => this.handleFilterDeleteClick(c.displayNum)}
          >
            <ValueColumn
              onSearchIconClick={() => this.handleSearchIconClick(c)}
              onValueChange={(newSubtype, newValue) => this.handleFilterValueChange(c.displayNum, newValue, newSubtype)}
              // NOTES:
              // This prop is used by the ValueColumn component, because it contains complex business logic,
              // so we pass data to it, and let it handle more complex behavior by itself.
              record={c}
            />
          </Criterion>
        ))}
        <Sider />
      </Fragment>
    );
  }
}

Criteria.defaultProps = defaultProps;
Criteria.propTypes = propTypes;
const mapStateToProps = ({ global, FilterCriteria__REFACTORED }) => ({
  language: global.language,
  conditions: global.settings.conditions,
  criteria: FilterCriteria__REFACTORED.criteria.criteria,
  fields: FilterCriteria__REFACTORED.criteria.fields,
});
const mapDispatchToProps = {
  setCriterionByColumn,
  removeCriterionByDisplayNum,
  toggleRightSider,
  fetchOptionsIfNeeded,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criteria);
