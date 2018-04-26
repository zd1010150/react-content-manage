import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { TaskPanel } from '../components/index';

const { ThemeTypesInArray } = Enums;


const propTypes = {
  objectId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


const TaskPanels = ({
  modules,
  objectId,
  objectType,
  theme,
}) => (
  <Fragment>
    {modules.map(module => (
      <TaskPanel
        key={module.code}
        code={module.code}
        objectId={objectId}
        objectType={objectType}
        theme={theme}
        canAdd
        canDelete
        canEdit
      />
    ))}
  </Fragment>
);


TaskPanels.propTypes = propTypes;
export default TaskPanels;
