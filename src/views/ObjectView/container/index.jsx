import { ObjectFilter } from 'components/page/index';
import React, { Fragment } from 'react';
// TODO: Should be removed after ObjectView__REFACTORED is finished, testing purpose only here.
import { ObjectView__REFACTORED } from '../../index';

const ObjectView = ({ match }) => {
  const { viewId, objectType } = match.params;
  return (
    <Fragment>
      <ObjectView__REFACTORED />
      <ObjectFilter
        viewId={viewId}
        objectType={objectType}
      />
      {/* <ObjectView__REFACTORED /> */}      
    </Fragment>
  );
};


export default ObjectView;
