import { SimpleTable } from 'components/page/index';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { TaskPanel } from '../components/index';

const { DetailModules, ThemeTypesInArray } = Enums;
const { Opportunities } = DetailModules;


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
    {modules.map((module) => {
      if (module.code === Opportunities) {
        return (
          <SimpleTable
            key={module.code}
            code={module.code}
            objectId={objectId}
            theme={theme}
          />
        );
      }
      return (
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
      );
    })}
  </Fragment>
);


TaskPanels.propTypes = propTypes;
export default TaskPanels;
