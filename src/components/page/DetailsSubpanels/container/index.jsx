import { SimpleTable } from 'components/page/index';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { isValidClientTypes } from 'utils/propChecks';
import { Subpanel } from '../components/index';

const { DetailModules, ThemeTypesInArray } = Enums;
const { Opportunities } = DetailModules;


const defaultProps = {
  modules: [],
};
const propTypes = {
  objectId: PropTypes.string.isRequired,
  objectType: isValidClientTypes.isRequired,
  modules: PropTypes.array,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


const DetailsSubpanels = ({
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
        <Subpanel
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


DetailsSubpanels.defaultProps = defaultProps;
DetailsSubpanels.propTypes = propTypes;
export default DetailsSubpanels;
