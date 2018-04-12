/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import { PAGE_ACTION } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import AddEditForm from './section-edit-add-form';


class sectionEditAddDialog extends React.Component {
  componentWillReceiveProps() {
    if (!_.isEmpty(this.form && this.form.resetFields)) { // 更新form表单里的值
      this.form.resetFields();
    }
  }
  save() {
    const {
      operate, sequence, code, addSection, updateSection, toggleSectionAddEditDialog,
    } = this.props;
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (operate === PAGE_ACTION.ADD) {
          addSection({ label: values.label, sequence, cols: values.cols });
        } else {
          updateSection({ label: values.label, sectionCode: code, cols: values.cols }); //
        }
        toggleSectionAddEditDialog({ isShow: false });
      }
    });
  }
  cancel() {
    this.props.toggleSectionAddEditDialog({ isShow: false });
  }
  render() {
    const {
      isShow, label, cols, code, intl, operate,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <Modal
        title={formatMessage({ id: `page.layouts.${operate === PAGE_ACTION.ADD ? 'addSectionDialogTitle' : 'editSectionDialogTitle'}` })}
        visible={isShow}
        onOk={() => this.save()}
        onCancel={() => this.cancel()}
      >
        <AddEditForm code={code} label={label} cols={cols} ref={c => this.form = c} />
      </Modal>
    );
  }
}

sectionEditAddDialog.defaultProps = {
  isShow: false,
};
sectionEditAddDialog.propTypes = {
  intl: intlShape.isRequired,
  isShow: PropTypes.bool,
  label: PropTypes.string.isRequired,
  sequence: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  operate: PropTypes.string.isRequired,
  addSection: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  toggleSectionAddEditDialog: PropTypes.func.isRequired,
};


export default injectIntl(sectionEditAddDialog);
