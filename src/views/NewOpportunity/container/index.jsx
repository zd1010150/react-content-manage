import React from 'react';


const NewOpportunity = ({ match }) => {
  const { objectId } = match.params;
  console.log(objectId);
  return (
    <div>123123 oid -> {objectId}</div>
  );
};


export default NewOpportunity;
