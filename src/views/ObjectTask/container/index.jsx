import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getThemeByType } from 'utils/common';
import { TaskDetails } from 'components/page/index';


const defaultProps = {};
const propTypes = {};


class ObjectTask extends Component {
  render() {
    const { match } = this.props;
    const { objectId, objectType } = match.params;
    const theme = getThemeByType(objectType);
    
    return (
      <TaskDetails
        theme={theme}
        objectId={objectId}
        objectType={objectType}
      />
    );
  }
}


export default ObjectTask;