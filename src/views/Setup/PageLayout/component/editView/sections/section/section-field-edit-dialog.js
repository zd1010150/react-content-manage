/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Modal, Checkbox, Row, Col, Button } from 'antd';
import styles from '../../../../index.less';

const cx = classNames.bind(styles);

class SectionFieldEditDialog extends React.Component {
  valueChange(attr, e) {
    this.props.setEditField({ [`${attr}Value`]: e.target.checked });
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
            <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
              <Checkbox checked={requiredValue} disabled={requiredDisable} onChange={e => this.valueChange('required', e)}> required </Checkbox>
            </span>
            <span className={classNames(cx('field-edit-dialog-checkbox'), 'pr-lg')}>
              <Checkbox checked={readOnlyValue} disabled={readOnlyDisable} onChange={e => this.valueChange('readOnly', e)}> read only </Checkbox>
            </span>
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
