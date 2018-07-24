/**
 * Criteria is used to wrap Criterion UI component, with controls to redux and render.
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Criterion } from 'components/ui/index';
import { connect } from 'react-redux';
import CriteriaHeader from './CriteriaHeader';
import { getConditionsByFieldType, shouldDisableCondition } from '../utils/compUtils';
import { setCriterionByColumn, removeCriterionByDisplayNum } from '../flow/actions';


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
  handleFilterValueChange = (displayNum) => {}
  handleFilterDeleteClick = (displayNum) => {
    console.log(`deleting -=- ${displayNum}`);
    this.props.removeCriterionByDisplayNum(displayNum);
  }
  handleSiderChange = () => {}

  render() {
    const { criteria, conditions, fields } = this.props;
    return (
      <Fragment>
        <CriteriaHeader />
        {criteria.map(c => (
          <Criterion
            // Basic data
            key={c.displayNum}
            displayNum={c.displayNum}
            fieldId={c.fieldId}
            conditionId={c.conditionId}
            shouldConditionDisabled={shouldDisableCondition(c.subtype)}
            availableFields={fields}
            availableConditions={getConditionsByFieldType(
              c.field ? c.field.type : null,
              conditions,
            )}
            // Handlers
            onFilterFieldChange={newValue => this.handleFilterFieldChange(c.displayNum, newValue)}
            onFilterConditionChange={newValue => this.handleFilterConditionChange(c.displayNum, newValue)}
            onFilterValueChange={() => this.handleFilterValueChange()}
            onFilterDeleteClick={() => this.handleFilterDeleteClick(c.displayNum)}
            onSiderChange={() => this.handleSiderChange()}
            // NOTES:
            // This prop is used by the value column component, because it contains complex business logic,
            // so we pass data to it, and let it handle more complex behavior by itself.
            record={c}
          />
        ))}
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
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criteria);
