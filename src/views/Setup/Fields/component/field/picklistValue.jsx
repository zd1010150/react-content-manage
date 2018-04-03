import React, { Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Radio, Icon, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { PAGE_ACTION, objTypeAndClassTypeMap } from 'config/app.config';
import { CardContainer, DeleteConfirmDialog, FloatingLabelInput } from 'components/ui/index';
import Enums from 'utils/EnumsManager';

const { confirm } = Modal;
class PickListValue extends React.Component {
    state={
      deleteDialogVisible: false,
      selectedId: '',
      replaceValue: '',
      radioSelectedId: '',
    }
    componentDidMount() {
      const { action, editObject, setAddedFieldAttr } = this.props;
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
    onEdit(id) {

    }
    onDelete(id) {
      const { action, deletePickListValue, editObject } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (!isEdit) {
        const { formatMessage } = this.props.intl;
        confirm({
          title: formatMessage({ id: 'global.ui.dialog.deleteTitle' }),
          onOk() {
            const newPickList = editObject.picklist.slice();
            newPickList.splice(id, 1);
            deletePickListValue();
          },
        });
      } else {
        this.setState({
          deleteDialogVisible: true,
          selectedId: id,
        });
      }
    }
    onDeative(id) {
      console.log('deactive', id);
    }
    onEdit(id) {
      console.log('onEdit', id);
    }
    sortValue(sortedArr) {
      const { action, setAddedFieldAttr } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (!isEdit) {
        setAddedFieldAttr({ picklist: sortedArr.map(f => f.option_value) });
      } else {
        setAddedFieldAttr({ picklist: sortedArr });
      }
    }
    addVal(val) {
      const {
        action, addPickListValue, addPickListValueToRemote, editObject,
      } = this.props;
      const isEdit = action === PAGE_ACTION.EDIT;
      if (!isEdit) {
        addPickListValue(val);
      } else {
        addPickListValueToRemote(editObject.field.id, val);
      }
    }
    submitReplace() {

    }
    cancelReplace() {
      this.setState({
        deleteDialogVisible: false,
      });
    }
    replacedChangeVal(val, id) {
      this.setState({
        replaceValue: val,
        radioSelectedId: id,
      });
    }
    render() {
      const {
        action, editObject, intl, objectType,
      } = this.props;
      const { formatMessage } = intl;
      const isEdit = action === PAGE_ACTION.EDIT;
      const classType = objTypeAndClassTypeMap[objectType];
      const deleteFooter = (<Fragment>
        <Button
          key="cancel"
          type="default"
          icon="close"
          size="small"
          onClick={() => this.cancelReplace()}
        >{ formatMessage({ id: 'global.ui.button.cancel' })}
        </Button>
        <Button
          key="save"
          size="small"
          type="danger"
          icon="save"
          onClick={() => this.submitReplace()}
        >{ formatMessage({ id: 'global.ui.button.replace' })}
        </Button>
      </Fragment>);
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
            {
                      isEdit ?
                        <DeleteConfirmDialog visible={this.state.deleteDialogVisible} modelConfig={{ footer: deleteFooter }}>
                          <p>please select a value to replace</p>
                          <Row>
                            {
                                      editObject.picklist.map((val) => {
                                          if (`${val.id}` !== `${this.state.selectedId}`) {
                                              return (
                                                <Col span={24}>
                                                  <Radio
                                                    checked={`${this.state.radioSelectedId}` === `${val.id}`}
                                                    value={val.id}
                                                    onChange={id => this.replacedChangeVal(val.option_value, id)}
                                                  >
                                                    { val.option_value }
                                                  </Radio>
                                                </Col>
                                              );
                                          }
                                      })
                                  }
                          </Row>
                          <p className="error-msg">Change can take up to 5 mins to become effective.</p>

                        </DeleteConfirmDialog> : ''
                  }
          </Col>
        </Row>


      );
    }
}
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
};
export default injectIntl(PickListValue);

