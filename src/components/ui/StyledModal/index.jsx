import { Button, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';

const defaultProps = {
  title: 'Modal Title',
  onCancel: null,
  onOk: null,
  theme: '',
  okDisabled: false,
};
const propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string,
  okDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  theme: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

const StyledModal = ({
  intl,
  children,
  okDisabled,
  onCancel,
  onOk,
  theme,
  ...other
}) => {
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

  const footer = (
    <Fragment>
      <Button
        className={theme ? `${theme}-theme-btn` : ''}
        onClick={_onOk}
        disabled={okDisabled}
      >
        <Icon className="font-sm" type="save" />
        {formatMessage({ id: 'global.ui.button.ok' })}
      </Button>
      <Button onClick={_onCancel}>
        <Icon className="font-sm" type="close" />
        {formatMessage({ id: 'global.ui.button.cancel' })}
      </Button>
    </Fragment>
  );

  return (
    <Modal
      {...other}
      className="customizedModal"
      onCancel={_onCancel}
      onOk={_onOk}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

StyledModal.defaultProps = defaultProps;
StyledModal.propTypes = propTypes;
export default injectIntl(StyledModal);
