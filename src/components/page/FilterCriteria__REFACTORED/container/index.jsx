/**
 * FilterCriteria is a shared component, used in filter criteria section View page and Report page.
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
// import FilterCriteria from 'components/ui/index';
import React, { Component, Fragment } from 'react';
import { Row, Button, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class FilterCriteria extends Component {
  componentDidMount() {}

  // handleSiderChange = () => {}

  // // Handle both field and condition changes
  // handleFilterSelectChange = (displayNum, colName, newValue) => {}

  // handleFilterValueChange = (displayNum) => {}

  handleAddNewFilterClick = () => {}

  handleLogicChange = () => {}

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.filterCriteria';

    return (
      <Fragment>
        {/* Criterion component */}
        <Row className="text-center">
          <Button size="small" onClick={this.handleAddNewFilterClick}>
            <Icon className="font-sm" type="plus" />
            {formatMessage({ id: `${i18nPrefix}.buttons.newFilter` })}
          </Button>
        </Row>
        {/* Floating input component */}
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(FilterCriteria));
