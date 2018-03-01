import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterWrapper from '../components/Filter/index';
import { Row } from 'antd';

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Row>
          <FilterWrapper />
          {/* btns */}
        </Row>
        {/* tables and table top bar */}
      </Fragment>
    );
  }
}

export default Leads;