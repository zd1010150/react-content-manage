import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { PAGE_ACTION, objTypeAndClassTypeMap } from 'config/app.config';
import { CardContainer, FloatingLabelInput, DeleteConfirmDialog } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import { PICKLIST_OPTION_EDIT } from '../../flow/pageAction';

const { confirm } = Modal;
class PickListValue extends React.Component {
    state={
      deleteDialogVisible: false,
      deleteId: '',
    }
    componentDidMount() {
      const { action, setAddedFieldAttr } = this.props;
      if (action === PAGE_ACTION.ADD) {
        setAddedFieldAttr({ picklist: [] });
      }
    }
    onIconClick = (e) => {
      const { id } = e.currentTarget.dataset;
      const { type } = e.target.dataset;
      const { Edit, Delete, Deactivate } = Enums.FieldOperationTypes;
      switch (type) {
        case Delete:
          this.onDelete(id);
          break;
        case Deactivate:
          this.onDeative(id);
          break;
        case Edit:
        default:
          this.onEdit(id);
      }
    }
    onDelete(id) {
      const {
        action, deletePickListValue, editObject, setReplaceDialog,
      } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (!isEdit) {
        const { formatMessage } = this.props.intl;
        this.setState({
          deleteDialogVisible: true,
          deleteId: id,
        });
      } else {
        setReplaceDialog({
          options: editObject.picklist.filter(v => `${v.id}` !== `${id}`),
          isVisible: true,
          replacedValId: id,
        });
      }
    }
    confirmDelete() {
      const { editObject, deletePickListValue } = this.props;
      const newPickList = editObject.picklist.slice();
      newPickList.splice(this.state.deleteId, 1);
      deletePickListValue();
    }
    onDeative(id) {
      const { updatePickListValueStatusToRemote, fetchFieldDetailInfo, editObject } = this.props;
      updatePickListValueStatusToRemote(id, { active: 0 }, () => {
        fetchFieldDetailInfo(editObject.field.id);
      });
    }
    onEdit(id) {
      const {
        setPickListValueManagement, editObject, history, objectType,
      } = this.props;
      setPickListValueManagement({
        valId: id,
        valueText: editObject.picklist.filter(v => `${v.id}` === `${id}`)[0].option_value,
      });
      history.push(`/setup/${objectType}/fields?&action=${PICKLIST_OPTION_EDIT}`);
    }
    sortValue(sortedArr) {
      const {
        action, setAddedFieldAttr, sortPicklistValueToRemote, fetchFieldDetailInfo, editObject,
      } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (!isEdit) {
        setAddedFieldAttr({ picklist: sortedArr.map(f => f.option_value) });
      } else {
        sortPicklistValueToRemote(sortedArr.map(v => v.id), () => {
          fetchFieldDetailInfo(editObject.field.id);
        });
      }
    }
    addVal(val) {
      const {
        editObject,
        action,
        addPickListValue,
        addPickListValueToRemote,
        fetchFieldDetailInfo,
      } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (_.isEmpty(val)) {
        return;
      }
      if (!isEdit) {
        addPickListValue(val);
      } else {
        addPickListValueToRemote(editObject.field.id, val, () => { fetchFieldDetailInfo(editObject.field.id); });
      }
    }

    render() {
      const {
        action,
        editObject,
        intl,
        objectType,
      } = this.props;
      const { formatMessage } = intl;
      const isEdit = action === PAGE_ACTION.EDIT;
      const classType = objTypeAndClassTypeMap[objectType];
      return (
        <Row>
          <Col span={14} offset={5}>
            <div className="pb-lg ">
              <FloatingLabelInput
                key={Math.random()}
                enterButton={<Icon type="save" />}
                withSearch
                handleSearch={val => this.addVal(val)}
                labelText={formatMessage({ id: 'page.fields.addNewValue' })}
              />
            </div>
            <CardContainer
              canDelete
              canEdit={isEdit}
              canDeactivate={isEdit}
              onIconClick={this.onIconClick}
              theme={classType}
              cardDisplayField="option_value"
              data={isEdit ? _.sortBy(editObject.picklist, ['display_num']) : editObject.picklist.map((val, index) => ({
                          id: index,
                          option_value: val,
                          display_num: index,
                      }))
                      }
              onDrop={sortedArr => this.sortValue(sortedArr)}
            />

          </Col>
          <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} >
            <h3>{ formatMessage({ id: 'global.ui.dialog.deleteTitle' })}</h3>
          </DeleteConfirmDialog>
        </Row>


      );
    }
}
PickListValue.defaultProps = {
  setReplaceDialog: () => {},
  updatePickListValueStatusToRemote: () => {},
  fetchFieldDetailInfo: () => {},
  addPickListValueToRemote: () => {},
  setPickListValueManagement: () => {},
};
PickListValue.propTypes = {
  intl: intlShape.isRequired,
  action: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,
  editObject: PropTypes.object.isRequired,
  setAddedFieldAttr: PropTypes.func.isRequired,
  deletePickListValue: PropTypes.func.isRequired,
  addPickListValue: PropTypes.func.isRequired,
  sortPicklistValueToRemote: PropTypes.func.isRequired,
  replacePickListValueToRemote: PropTypes.func.isRequired,
  addPickListValueToRemote: PropTypes.func,
  setReplaceDialog: PropTypes.func,
  updatePickListValueStatusToRemote: PropTypes.func,
  fetchFieldDetailInfo: PropTypes.func,
  setPickListValueManagement: PropTypes.func,
  history: PropTypes.object,
};
export default injectIntl(PickListValue);

