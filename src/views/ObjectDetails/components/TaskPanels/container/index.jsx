import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { TaskPanel } from '../components/index';

const { ThemeTypesInArray } = Enums;


const propTypes = {
  objectId: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


const TaskPanels = ({ modules, objectId, theme }) => (
  <Fragment>
    {[].map(module => (
      <TaskPanel
        key={module.code}
        code={module.code}
        objectId={objectId}
        module={module}
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
