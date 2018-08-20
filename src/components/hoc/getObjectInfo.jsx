/* eslint-disable react/prefer-stateless-function */
/**
 * The HOC is used to get object info from url. Current results include object id and object type.
 * @author: Ronan
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const getObjectInfo = WrappedComponent => withRouter(class extends Component {
  render() {
    const { objectId, objectType } = this.props.match.params;
    return (
      <WrappedComponent
        objectId={objectId}
        objectType={objectType}
        {...this.props}
      />
    );
  }
});

export default getObjectInfo;
