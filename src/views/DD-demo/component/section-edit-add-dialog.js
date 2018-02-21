/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import { ADD } from '../flow/operateType';


class sectionEditAddDialog extends React.Component {
  setLabel(text) {
    this.props.setSectionLable({ label: text });
  }
  save() {
    const {
      operate, sequence, label, code, addSection, updateSection, toggleSectionAddEditDialog
    } = this.props;
    if (operate === ADD) {
      addSection({ label, sequence });
    } else {
      updateSection({ label, sectionCode: code }); //
    }
    toggleSectionAddEditDialog({ isShow: false });
  }
  cancel() {
    this.props.toggleSectionAddEditDialog({ isShow: false });
  }
  render() {
    const {
      isShow, label,
    } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={isShow}
        onOk={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
      >
        <p><Input placeholder="输入section名" value={label} onInput={e => this.setLabel(e.target.value)} /></p>
      </Modal>
    );
  }
}

sectionEditAddDialog.defaultProps = {
  isShow: false,
  label: '',
  sequence: 0,
  code: '',
  operate: 'add',
};
sectionEditAddDialog.propTypes = {
  isShow: PropTypes.bool,
  label: PropTypes.string,
  sequence: PropTypes.number,
  code: PropTypes.string,
  operate: PropTypes.string,
  addSection: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  setSectionLable: PropTypes.func.isRequired,
  toggleSectionAddEditDialog: PropTypes.func.isRequired,
};


export default sectionEditAddDialog;
