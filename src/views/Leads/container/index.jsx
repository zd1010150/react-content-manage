import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import Topbar from './Topbar';

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
        <FloatingLabelInput
          labelText="Test Label"
          labelColor="red"
          syncWithRedux={this.syncWithRedux}
        />
      </Fragment>
    );
  }
}

export default Leads;