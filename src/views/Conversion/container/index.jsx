import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ConvertDetails } from 'components/page/index';

const propTypes = {};


const Conversion = ({ objectId }) => {
  return (
    <Fragment>
      <ConvertDetails objectId={objectId} />
    </Fragment>
  );
};


export default Conversion;
