/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Enums from 'utils/EnumsManager';

import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Modal, Checkbox, Row, Col, Button } from 'antd';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);
const CheckboxGroup = Checkbox.Group;
const { ReadOnly, Required } = Enums.EditViewType;

class SectionFieldEditDialog extends React.Component {
  valueChange(checkedValues) {
    const { fieldId } = this.props.fieldEditDialog;
    this.props.setEditField({ showValue: { [`${fieldId}`]: checkedValues }, fieldId });
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
      requiredDisable,
      readOnlyDisable,
      showValue,
      fieldId,
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
            <CheckboxGroup value={showValue[fieldId]} onChange={checkedValues => this.valueChange(checkedValues)}>
              <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
                <Checkbox value={Required} disabled={requiredDisable}> {formatMessage({ id: 'page.layouts.edit.required' })} </Checkbox>
              </span>
              <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
                <Checkbox value={ReadOnly} disabled={readOnlyDisable}> {formatMessage({ id: 'page.layouts.edit.readOnly' })} </Checkbox>
              </span>
            </CheckboxGroup>
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
