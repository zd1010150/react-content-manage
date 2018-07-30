import { ObjectFilter } from 'components/page/index';
import React, { Fragment } from 'react';

const ObjectView = ({ match }) => {
  const { viewId, objectType } = match.params;
  return (
    <Fragment>
      <ObjectFilter
        viewId={viewId}
        objectType={objectType}
      />
      {/* <ObjectView__REFACTORED /> */}      
    </Fragment>
  );
};


export default ObjectView;
