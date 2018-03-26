import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Row, Col } from 'antd';

import { FloatingLabelInput, FilterCondition, CriteriaHeader } from 'components/ui/index';
import { addFilter, removeFilter, setConditionLogic } from './flow/actions';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class FilterCriteria extends Component {
  handleLogicChange = value => this.props.setConditionLogic(value)

  addFilter = e => this.props.addFilter()

  onRemoveFilter = e => this.props.removeFilter(e.target.dataset.displayNum)

  render() {
    const i18n = 'page.objectFilter.criteria';
    const { filters, intl } = this.props;
    const { formatMessage } = intl;

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
            + {formatMessage({ id: `${i18n}.buttons.newFilter`})}
          </Button>
        </Row>
        <FloatingLabelInput
          labelText={formatMessage({ id: `${i18n}.inputs.condition`})}
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FilterCriteria));