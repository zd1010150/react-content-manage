import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Topbar from './Topbar';
import Panel from './Panel';

class Leads extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <Panel theme="lead"/>
      </Fragment>
    );
  }
}

export default Leads;