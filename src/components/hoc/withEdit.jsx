/**
 * withEdit is a HOC that empowers the wrapped component with cell editing capabilities.
 * @author: Ronan
 * @version: 0.1
 * @param: {ReactNode} WrappedComponent
 * @description:
 *  * double click to enable a specific cell to be editable
 *  * on blur from a specific cell will disable edit mode
 *  * sync cell change with state/redux
 * *
 */
import React, { Component } from 'react';

function withEdit(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      console.log('--->PROPS<---');
      console.dir(props);
    }

    handleDbClick = () => {
    }

    render() {
      return (
        <WrappedComponent
          onDbClick={this.handleDbClick}
        />
      );
    }
  };
}

export default withEdit;
