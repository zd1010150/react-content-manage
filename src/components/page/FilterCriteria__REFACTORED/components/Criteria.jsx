/**
 * Criteria is used to wrap Criterion UI component, with controls to redux and render.
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Criterion } from 'components/ui/index';
import { connect } from 'react-redux';
import CriteriaHeader from './CriteriaHeader';
import { getConditionsByFieldType, shouldDisableCondition } from '../utils/compUtils';

const defaultProps = {};
const propTypes = {
  // TODO: replace with array of shape of
  filters: PropTypes.array.isRequired,
};

class Criteria extends Component {
  // TODO: add actuall handlers
  // Handle both field and condition changes
  handleFilterFieldChange = (displayNum, newValue) => {
    console.log(`${displayNum} -=- ${newValue}`);
  }
  handleFilterConditionChange = (displayNum, newValue) => {
    console.log(`${displayNum} -=- ${newValue}`);
  }
  handleFilterValueChange = (displayNum) => {}
  handleFilterDeleteClick = (displayNum) => {}
  handleSiderChange = () => {}  

  render() {
    const { filters, conditions } = this.props;
    return (
      <Fragment>
        <CriteriaHeader />
        {filters.map(c => (
          <Criterion
            // TODO: replace with c.displayNum
            key={c}
            availableFields={undefined}
            availableConditions={getConditionsByFieldType(c.type, conditions)}
            onFilterFieldChange={newValue => this.handleFilterFieldChange(c.displayNum, newValue)}
            onFilterConditionChange={newValue => this.handleFilterConditionChange(c.displayNum, newValue)}
            onFilterValueChange={() => this.handleFilterValueChange()}
            onFilterDeleteClick={() => this.handleFilterDeleteClick()}
            onSiderChange={() => this.handleSiderChange()}
            conditionDisabled={shouldDisableCondition()}
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
  filters: FilterCriteria__REFACTORED.criteria.filters,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criteria);
