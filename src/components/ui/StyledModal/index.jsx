import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Modal } from 'antd';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

const StyledModal = ({ intl, children, onCancel, onOk, ...other }) => {
  
  const _onCancel = $ => {
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  };

  const _onOk = $ => {
    if (_.isFunction(onOk)) {
      onOk();
    }
  };

  const { formatMessage } = intl;

  return (
    <Modal
      className="customizedModal"
      { ...other }
      onCancel={_onCancel}
      onOk={_onOk}
    >
      {children}
    </Modal>
  );
};

StyledModal.defaultProps = defaultProps;
StyledModal.propTypes = propTypes;
export default injectIntl(StyledModal);