import { ConvertDetails, TaskDetails } from 'components/page/index';
import React, { Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { Actions } from '../components/index';

const { PhantomId, ObjectTypes, ThemeTypes } = Enums;
const { Leads } = ObjectTypes;

const Conversion = ({ objectId }) => (
  <Fragment>
    <ConvertDetails objectId={objectId} />
    <TaskDetails
      taskId={PhantomId}
      objectId={objectId}
      objectType={Leads}
      theme={ThemeTypes.Leads}
      disableActions
    />
    <Actions objectId={objectId} />
  </Fragment>
);

export default Conversion;
