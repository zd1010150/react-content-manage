import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import Topbar from './Topbar';

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Topbar />
        {/* tables and table top bar */}
      </Fragment>
    );
  }
}

export default Leads;