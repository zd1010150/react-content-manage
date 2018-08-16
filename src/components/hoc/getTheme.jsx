/**
 * The HOC is used to get theme by accessing url params, in turns to facilitate our wrapped component to render class with specific theme.
 * 'withRouter' is required in order to access url params.
 * @author: Ronan
 * @description: A common use case would be to wrap a View component.
 */
// FIXME: There's an issue when we try to wrap this HOC with 'withRouter'. It will throw errors about export type.
//        Currently, we just avoid this issue because parent component has already introduced 'withRouter'.
//        But in this case, the HOC may not be reusable in other project.
import React, { Component } from 'react';
import { getThemeByType } from 'utils/common';

function getTheme(WrappedComponent) {
  return class extends Component {
    render() {
      const { objectType } = this.props.match.params;
      return (
        <WrappedComponent
          theme={getThemeByType(objectType)}
          {...this.props}
        />
      );
    }
  };
};

// export default withRouter(getTheme);
export default getTheme;
