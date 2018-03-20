import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';

import { FloatingLabelInput, FilterCondition, CriteriaHeader } from 'components/ui/index';
import { addFilter, setConditionLogic } from './flow/actions';

const defaultProps = {};
const propTypes = {};

class FilterCriteria extends Component {
  handleLogicChange = value => {
    this.props.setConditionLogic(value);
  }

  addFilter = e => {
    this.props.addFilter();
  }

  render() {
    const { filters } = this.props;
    return (
      <Fragment>
        <CriteriaHeader />
        {filters.map((filter, index) => <FilterCondition key={index} />)}
        <Row style={{ textAlign: 'center' }}>
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
          labelColor="#09c"
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
  setConditionLogic,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterCriteria);