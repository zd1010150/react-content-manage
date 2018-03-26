import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Row, Col } from 'antd';

import { FloatingLabelInput, Criterion, CriteriaHeader } from 'components/ui/index';
import {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeField,
} from './flow/actions';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class FilterCriteria extends Component {
  handleLogicChange = value => this.props.setConditionLogic(value)

  addFilter = e => this.props.addFilter()

  onRemoveFilter = e => this.props.removeFilter(e.target.dataset.displayNum)

  handleFieldChange = (value, display_num) => {
    console.log(`display_num: ${display_num} -> ${value}`);
    const { allFields } = this.props;
    const field = allFields.find(field => field.id === value);
    if (field) {
      this.props.changeField(value, display_num, field.crm_data_type);
    }
  }

  handleConditionChange = (value, display_num) => {
    console.log(`display_num: ${display_num} -> ${value}`);
  }

  render() {
    const {
      condition_logic,
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
        {filters.map(filter => (
          <Criterion
            key={filter.display_num}
            displayNum={filter.display_num}
            onRemoveFilter={this.onRemoveFilter}
            fieldType={filter.type}
            allFields={allFields}
            conditions={conditions}
            handleFieldChange={this.handleFieldChange}
            handleConditionChange={this.handleConditionChange}
          />
        ))}
        <Row style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button
            onClick={this.addFilter}
            className="ml-sm lead-theme-btn"
            size="small"
          >
            + {formatMessage({ id: `${i18nPrefix}.buttons.newFilter`})}
          </Button>
        </Row>
        <FloatingLabelInput
          labelText={formatMessage({ id: `${i18nPrefix}.inputs.condition`})}
          labelColor="#4e4e4e"
          handleChange={this.handleLogicChange}
          value={condition_logic}
        />
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  conditions: global.settings.conditions,
  condition_logic: objectView.filterCriteria.condition_logic,
  filters: objectView.filterCriteria.filters,
  allFields: objectView.fields.allFields,
});
const mapDispatchToProps = {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeField,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FilterCriteria));