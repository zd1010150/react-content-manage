import React from 'react';
import PropTypes from 'prop-types';

import { FloatingLabelInput } from 'components/ui/index';
const Inputs = () => {
  return (
    <FloatingLabelInput
      labelText="Click to let me float"
      labelColor="aqua"
      placeholder="Wow, the label is floating"
    />
  );
}

export default Inputs;