/* eslint-disable react/prefer-stateless-function */
/**
 * The HOC is used to get theme by accessing url params, in turns to facilitate our wrapped component to render class with specific theme.
 * 'withRouter' is required in order to access url params.
 * @author: Ronan
 * @description: A common use case would be to wrap a View component.
 */
import React, { Component } from 'react';
import { getThemeByType } from 'utils/common';
import { withRouter } from 'react-router-dom';


// TODO: Figure out whether prop check can be done at this level.
// TODO: Find a way to make sure 'withRouter' wraps target class properly.
const getTheme = WrappedComponent => withRouter(class extends Component {
  render() {
    const { objectType } = this.props.match.params;
    return (
      <WrappedComponent
        theme={getThemeByType(objectType)}
        {...this.props}
      />
    );
  }
});

// export default withRouter(getTheme);
export default getTheme;
