import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import Topbar from './Topbar';
import Panel from './Panel';

// test
import { FloatingLabelInput } from 'components/ui/index';
// test ends

class Leads extends Component {

  syncWithRedux = value => {
    console.log(`ATTENTION -> ${value}`);
  }

  render() {
    return (
      <Fragment>
        <Topbar />
        {/* tables and table top bar */}
        <Panel theme="lead"/>
      </Fragment>
    );
  }
}

export default Leads;