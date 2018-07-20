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
