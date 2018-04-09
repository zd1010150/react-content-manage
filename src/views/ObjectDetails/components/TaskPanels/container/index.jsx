import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TaskPanel } from '../components/index';
import Enums from 'utils/EnumsManager';
const { DetailModulesInArray } = Enums;


const propTypes = {
  objectId: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray).isRequired,
};


const TaskPanels = ({ theme, objectId }) => {
  return (
    <Fragment>
      {DetailModulesInArray.map(module => (
        <TaskPanel
          canAdd
          canDelete
          canEdit
          key={module}
          objectId={objectId}
          module={module}
          theme={theme}        
        />
      ))}
    </Fragment>
  );
}


export default TaskPanels;