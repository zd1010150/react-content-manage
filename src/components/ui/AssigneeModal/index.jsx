import React from 'react';
import PropTypes from 'prop-types';

import { FloatingLabelInput, StyledModal } from '../index';


const propTypes = {

};


const AssigneeModal = () => {
  return (
    <StyledModal
      title={formatMessage({ id: `${i18nPrefix}.buttons.addUserToShare`})}
      visible={visible}
      onOk={this.onOk}
      onCancel={this.onCancel}
    >
      <FloatingLabelInput
        labelText="Search"
        placeholder="Filter by Name/Role/Team"
        addonAfter={<Icon size="small" type="search" />}
      />
    </StyledModal>
  );
};