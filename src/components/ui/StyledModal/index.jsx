import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Modal } from 'antd';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const StyledModal = ({ intl, children, ...other }) => {
  const { formatMessage } = intl;
  return (
    <Modal
      className="customizedModal"
      {...other}
    >
      {children}
    </Modal>
  );
};

StyledModal.defaultProps = defaultProps;
StyledModal.propTypes = propTypes;
export default injectIntl(StyledModal);