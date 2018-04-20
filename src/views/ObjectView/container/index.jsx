import { ObjectFilter } from 'components/page/index';
import React from 'react';


const ObjectView = ({ match }) => {
  const { viewId, objectType } = match.params;
  return (
    <ObjectFilter
      viewId={viewId}
      objectType={objectType}
    />
  );
};


export default ObjectView;
