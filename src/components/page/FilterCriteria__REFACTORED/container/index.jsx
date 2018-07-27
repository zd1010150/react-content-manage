/**
 * FilterCriteria is a shared component, used in filter criteria section for both View page and Report page.
 *
 * @Date: 20th July 2018
 * @Author: Ronan
 * @Test Status: !Not tested.
 * @Features:
 * * User can add filter by choosing field, condition rule and related values.
 * * All custom field types are supported.
 * * One redux store is shared by all FilterCriteria instances.
 * * Able to use filter's display num to apply complex rules. (AND/OR)
 * * Easy to use time range filter with advanced functionalities.
 *
 */
import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Criteria from '../components/Criteria';
import { addCriterion, resetCriteria } from '../flow/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  logic: PropTypes.string.isRequired,
};

class FilterCriteria extends Component {
  componentWillUnmount() {
    this.props.resetCriteria();
  }

  handleAddFilterClick = () => this.props.addCriterion()

  handleLogicChange = () => {
    console.log(`Changing filter logic`);
    // TODO: dispatch action to change filter logic text
    // this.props.changeFilterLogic();
  }

  render() {
    const { intl, logic } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.filterCriteria';

    return (
      <Fragment>
        <Criteria />
        <div className="mt-md text-center">
          <Button size="small" onClick={this.handleAddFilterClick}>
            <Icon className="font-sm" type="plus" />
            {formatMessage({ id: `${i18nPrefix}.buttons.newFilter` })}
          </Button>
        </div>
        {/* Floating input component */}
        {logic}
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
const mapStateToProps = ({ global, FilterCriteria__REFACTORED }) => ({
  language: global.language,
  logic: FilterCriteria__REFACTORED.conditionLogic,
});
const mapDispatchToProps = {
  addCriterion,
  resetCriteria,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(FilterCriteria));
