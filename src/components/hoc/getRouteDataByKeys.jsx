/* eslint-disable react/prefer-stateless-function */
/**
 * The HOC is used to get route info from url
 * @author: Ronan
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const getRouteDataByKeys = routeKeys => WrappedComponent => withRouter(class extends Component {
  render() {
    const { params } = this.props.match;
    const routeData = {};
    if (_.isArray(routeKeys)) {
      routeKeys.forEach((key) => {
        routeData[key] = params[key];
      });
    }

    return (
      <WrappedComponent
        {...routeData}
        {...this.props}
      />
    );
  }
});

export default getRouteDataByKeys;
