import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';

import { FloatingLabelInput, FilterCondition, CriteriaHeader } from 'components/ui/index';
import { addFilter, removeFilter, setConditionLogic } from './flow/actions';

const defaultProps = {};
const propTypes = {};

class FilterCriteria extends Component {
  handleLogicChange = value => {
    this.props.setConditionLogic(value);
  }

  addFilter = e => {
    this.props.addFilter();
  }

  onRemoveFilter = e => {
    const { displayNum } = e.target.dataset;
    console.log(e.target.dataset.displayNum);
    this.props.removeFilter(displayNum);
  }

  render() {
    const { filters } = this.props;
    return (
      <Fragment>
        <CriteriaHeader />
        {filters.map((filter, index) => <FilterCondition key={index} displayNum={filter.display_num} onRemoveFilter={this.onRemoveFilter} />)}
        <Row style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button
            onClick={this.addFilter}
            className="ml-sm lead-theme-btn"
            size="small"
          >
            + New Filter
          </Button>
        </Row>
        <FloatingLabelInput
          labelText="Condition Logic"
          labelColor="#4e4e4e"
          handleChange={this.handleLogicChange}
        />
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  filters: objectView.filterCriteria.filters,
});
const mapDispatchToProps = {
  addFilter,
  removeFilter,
  setConditionLogic,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterCriteria);