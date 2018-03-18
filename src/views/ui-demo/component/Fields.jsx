import React, { Component } from 'react';
import { CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';

class FieldsWrapper extends Component {
  render() {
    return (
      <div>
        {Enums.FieldTypesInArray.map(type => <CustomField key={type} type={type} value={''} />)}
      </div>
    );
  }
}

export default FieldsWrapper;