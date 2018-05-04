import { TaskDetails } from 'components/page/index';
import React, { Component } from 'react';
import { getThemeByType } from 'utils/common';


class ObjectTask extends Component {
  render() {
    const { match, defaultStateId } = this.props;
    const { objectId, objectType, taskId } = match.params;
    const theme = getThemeByType(objectType);
    
    return (
      <TaskDetails
        theme={theme}
        objectId={objectId}
        objectType={objectType}
        taskId={taskId}
        defaultStateId={defaultStateId}
      />
    );
  }
}


export default ObjectTask;
