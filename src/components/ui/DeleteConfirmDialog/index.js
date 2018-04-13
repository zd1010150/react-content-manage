import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';

class DeleteConfirmDialog extends React.Component {
  onOk() {
    const { onOk, modelConfig } = this.props;
    const okHandler = onOk || modelConfig.onOk;
    if (_.isFunction(okHandler)) {
      okHandler();
    }
  }
  onCancel() {
    const { onCancel, modelConfig } = this.props;
    const cancelHandler = onCancel || modelConfig.onCancel;
    if (_.isFunction(cancelHandler)) {
      cancelHandler();
    }
  }
  render() {
    const {
      intl, modelConfig, visible, children, confirmText,
    } = this.props;
    const { formatMessage } = intl;
    const footer = [
      <Button type="danger" size="small" onClick={() => this.onOk()}><Icon type="delete" />{formatMessage({ id: `global.ui.button.${confirmText}` })}</Button>,
      <Button className="mr-lg" size="small" onClick={() => this.onCancel()}><Icon type="close" />{formatMessage({ id: 'global.ui.button.cancel' })}</Button>,
    ];
    const config = Object.assign({}, {
      footer,
      title: formatMessage({ id: 'global.ui.dialog.warning' }),
      visible,
      wrapClassName: 'danger-dialog',
      onCancel: () => { this.onCancel(); },
    }, modelConfig);
    return (
      <Modal {...config} >
        { children || formatMessage({ id: 'global.ui.dialog.deleteTitle' }) }
      </Modal>
    );
  }
}
DeleteConfirmDialog.defaultProps = {
  visible: false,
  onOk: null,
  onCancel: null,
  modelConfig: {},
  children: null,
  confirmText: 'delete',
};

DeleteConfirmDialog.propTypes = {
  intl: intlShape.isRequired,
  modelConfig: PropTypes.object,
  confirmText: PropTypes.string,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  children: PropTypes.element,
};


export default injectIntl(DeleteConfirmDialog);

