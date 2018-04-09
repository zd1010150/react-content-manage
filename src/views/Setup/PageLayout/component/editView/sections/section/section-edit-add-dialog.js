/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import AddEditForm from './section-edit-add-form';
import { PAGE_ACTION } from 'config/app.config';


class sectionEditAddDialog extends React.Component {
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
      isShow, label, cols, code,
    } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={isShow}
        onOk={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
      >
        <AddEditForm code={code} label={label} cols={cols} ref={c => this.form = c } key={Math.random()}/>
      </Modal>
    );
  }
}

sectionEditAddDialog.defaultProps = {
  isShow: false,
};
sectionEditAddDialog.propTypes = {
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


export default sectionEditAddDialog;
