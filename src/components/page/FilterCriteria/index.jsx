import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'antd';

import Enums from 'utils/EnumsManager';
import { Buttons, ConditionLogic, Filters } from './components/index';

const defaultProps = {};
const propTypes = {
};

class FilterCriteria extends Component {
  _handleAddNewClick = $ => {
    const { handleAddNewClick } = this.props;
    if (_.isFunction(handleAddNewClick)) {
      return handleAddNewClick();
    }
  }

  _handleLogicChange = value => {
    const { handleLogicChange } = this.props;
    if (_.isFunction(handleLogicChange)) {
      return handleLogicChange(value);
    }
  }

  _handleFilterRemove = e => {
    const { handleFilterRemove } = this.props;
    if (_.isFunction(handleFilterRemove)) {
      const { displayNum } = e.target.dataset;
      return handleFilterRemove(displayNum);
    }
  }

  render() {
    const { match, logicText, fields, filters, conditions } = this.props;
    const { object } = match.params;

    return (
      <Fragment>
        <Row>
          <Filters
            fields={fields}
            conditions={conditions}
            filters={filters}
            handleFilterRemove={this._handleFilterRemove}
          />
        </Row>
        <Row style={{ textAlign: 'center', margin: '10px 0' }}>
          <Buttons objectType={object} handleAddClick={this._handleAddNewClick} />
        </Row>
        <Row>
          <ConditionLogic value={logicText} handleChange={this._handleLogicChange} />
        </Row>
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
export default withRouter(FilterCriteria);