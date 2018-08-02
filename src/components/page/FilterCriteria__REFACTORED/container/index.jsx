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
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setTheme } from 'store/global/action';
import ConditionLogic from '../components/ConditionLogic';
import Criteria from '../components/Criteria';
import { addCriterion, resetCriteria, setLogic } from '../flow/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  logic: PropTypes.string.isRequired,
  criteria: PropTypes.array.isRequired,
};

class FilterCriteria extends Component {
  // TODO: move setTheme to upper class
  componentDidMount() {
    this.props.setTheme(this.props.theme);
  }

  componentWillUnmount() {
    this.props.resetCriteria();
  }

  handleAddFilterClick = () => this.props.addCriterion()

  handleLogicChange = newLogic => this.props.setLogic(newLogic)

  render() {
    const { intl, activeTheme } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.filterCriteria';

    return (
      <Fragment>
        <Criteria />
        <div className="mt-md text-center">
          <Button className={`${activeTheme}-theme-btn`} size="small" onClick={this.handleAddFilterClick}>
            <Icon className="font-sm" type="plus" />
            {formatMessage({ id: `${i18n}.buttons.newFilter` })}
          </Button>
        </div>
        <ConditionLogic />
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
const mapStateToProps = ({ global, FilterCriteria__REFACTORED }) => ({
  language: global.language,
  activeTheme: global.theme,
  logic: FilterCriteria__REFACTORED.logic,
  criteria: FilterCriteria__REFACTORED.criteria.criteria,
});
const mapDispatchToProps = {
  addCriterion,
  resetCriteria,
  setLogic,
  setTheme,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(FilterCriteria));
