/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Checkbox, Row, Col } from 'antd';
import AddEditForm from './section-edit-add-form';
import { PAGE_ACTION } from 'config/app.config';


class SectionFieldEditDialog extends React.Component {
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
            isShow,
            fieldLabel,
            fieldId,
            sectionCode,
            requiredValue,
            requiredDisable,
            readOnlyValue,
            readOnlyDisable,
        } = this.props.fieldEditDialog;
        return (
            <Modal
                title="Basic Modal"
                visible={isShow}
                onOk={this.save.bind(this)}
                onCancel={this.cancel.bind(this)}
            >
            <Row>
                <Col/>
            </Row>
            </Modal>
        );
    }
}

SectionFieldEditDialog.defaultProps = {
    isShow: false,
};
SectionFieldEditDialog.propTypes = {
    isShow: PropTypes.bool.isRequired,
    fieldEditDialog: PropTypes.object.isRequired,
};


export default sectionEditAddDialog;
