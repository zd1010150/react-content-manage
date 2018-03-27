import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'antd';

import Enums from 'utils/EnumsManager';
import { Buttons, ConditionLogic } from './components/index';

const defaultProps = {};
const propTypes = {
};

class FilterCriteria extends Component {
  _handleAddNewClick = e => {
    const { handleAddNewClick } = this.props;
    if (_.isFunction(handleAddNewClick)) {
      handleAddNewClick();
    }
  }

  _handleLogicChange = value => {
    const { handleLogicChange } = this.props;
    if (_.isFunction(handleLogicChange)) {
      handleLogicChange(value);
    }
  }

  render() {
    const { match, logicText } = this.props;
    const { object } = match.params;

    return (
      <Fragment>
        <Row>
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