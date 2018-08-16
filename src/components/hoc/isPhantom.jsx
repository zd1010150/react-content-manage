/* eslint-disable react/prefer-stateless-function */
/**
 * The HOC is used to check whether the current url has specific id is phantom.
 * 'withRouter' is required in order to access url params.
 * @author: Ronan
 * @param: paramKey {string} should be a key used in Route regex url
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';

const { PhantomId } = Enums;

const isPhantom = (WrappedComponent, paramKey = PhantomId) => withRouter(class extends Component {
  render() {
    const param = this.props.match.params[paramKey];
    return (
      <WrappedComponent
        isPhantom={param === PhantomId}
        {...this.props}
      />
    );
  }
});

export default isPhantom;
