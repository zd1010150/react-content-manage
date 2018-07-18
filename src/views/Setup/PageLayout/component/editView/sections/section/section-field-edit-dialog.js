/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Modal, Radio, Row, Col, Button } from 'antd';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;

class SectionFieldEditDialog extends React.Component {
  state = {
    value: '',
  }
  valueChange(e) {
    this.props.setShowValue({ showValue: e.target.value });
  }
  save() {
    const {
      changeFieldAttr, fieldEditDialog, setEditField,
    } = this.props;
    changeFieldAttr(fieldEditDialog);
    setEditField({ isShow: false });
  }
  cancel() {
    this.props.setEditField({ isShow: false });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      isShow,
      fieldLabel,
      requiredValue,
      requiredDisable,
      readOnlyValue,
      readOnlyDisable,
      showValue,
    } = this.props.fieldEditDialog;
    return (
      <Modal
        title={formatMessage({ id: 'page.layouts.editField' })}
        visible={isShow}
        footer={[
          <Button key="save" size="small" icon="close" onClick={() => this.cancel()}> {formatMessage({ id: 'global.ui.button.cancel' })}</Button>,
          <Button key="save" size="small" icon="save" type="danger" onClick={() => this.save()}> {formatMessage({ id: 'global.ui.button.save' })}</Button>,
        ]}
        onCancel={() => this.cancel()}
      >
        <Row>
          <Col span={22} offset={2}>
            <span className={classNames(cx('field-edit-dialog-label'), 'pr-lg')}>{fieldLabel}: </span>
            <RadioGroup value={showValue ==='readOnly' ? this.state.value = 'readOnly' : this.state.value = 'required'}  onChange={e => this.valueChange(e)}>
              <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
                <Radio disabled={requiredDisable} value='required'> required </Radio>
              </span>
              <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
                <Radio disabled={readOnlyDisable} value='readOnly'> read only </Radio>
              </span>
            </RadioGroup>
          </Col>
        </Row>
      </Modal>
    );
  }
}


SectionFieldEditDialog.propTypes = {
  intl: intlShape.isRequired,
  fieldEditDialog: PropTypes.object.isRequired,
  setEditField: PropTypes.func.isRequired,
  changeFieldAttr: PropTypes.func.isRequired,
};


export default injectIntl(SectionFieldEditDialog);
