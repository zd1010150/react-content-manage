import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';

import { FilterCondition } from '../../../ui/index';

class ObjectFilter extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    
  }

  render() {
    const { match } = this.props;
    const { object, viewId } = match.params;
    return (
      <div>
        <span>object: {object}</span>
        <br />
        <span>view: {viewId}</span>
        <FilterCondition/>
      </div>
    );
  }
}

export default ObjectFilter;