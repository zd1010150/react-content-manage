/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Radio } from 'antd';
import { ADD } from '../../flow/operateType';

const RadioGroup = Radio.Group;
class sectionEditAddDialog extends React.Component {
  setAttr(attrs) {
    this.props.setSectionAttr(attrs);
  }
  save() {
    const {
      operate, sequence, label, code, addSection, updateSection, toggleSectionAddEditDialog, cols,
    } = this.props;
    if (operate === ADD) {
      addSection({ label, sequence, cols });
    } else {
      updateSection({ label, sectionCode: code, cols }); //
    }
    toggleSectionAddEditDialog({ isShow: false });
  }
  cancel() {
    this.props.toggleSectionAddEditDialog({ isShow: false });
  }
  render() {
    const {
      isShow, label, cols,
    } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={isShow}
        onOk={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
      >
        <p><Input placeholder="输入section名" defaultValue={label} value={label} onInput={e => this.setAttr({ label: e.target.value })} /></p>
        <RadioGroup onChange={e => this.setAttr({ cols: e.target.value })} value={cols}>
          <Radio value={1}>col 1</Radio>
          <Radio value={2}>col 2</Radio>
        </RadioGroup>
      </Modal>
    );
  }
}

sectionEditAddDialog.defaultProps = {
  isShow: false,
  label: '',
  sequence: 0,
  cols: 1,
  code: '',
  operate: 'add',
};
sectionEditAddDialog.propTypes = {
  isShow: PropTypes.bool,
  label: PropTypes.string,
  sequence: PropTypes.number,
  cols: PropTypes.number,
  code: PropTypes.string,
  operate: PropTypes.string,
  addSection: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  setSectionAttr: PropTypes.func.isRequired,
  toggleSectionAddEditDialog: PropTypes.func.isRequired,
};


export default sectionEditAddDialog;
