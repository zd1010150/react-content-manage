import React, { Fragment } from 'react';

import { TaskPanel } from 'components/page/index';
import Enums from 'utils/EnumsManager';
const { DetailModulesInArray } = Enums;


const propTypes = {
  
};


const TaskPanels = ({ theme, objectType }) => {
  return (
    <Fragment>
      {DetailModulesInArray.map(module => (
        <TaskPanel
          key={module}
          module={module}
          theme={theme}
          canAdd
          canEdit
          canDelete
        />
      ))}
    </Fragment>
  );
}


export default TaskPanels;