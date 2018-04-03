/* eslint-disable no-shadow,react/prop-types */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Icon, Col, Row, Radio } from 'antd';
import { connect } from 'react-redux';
import { Panel, DeleteConfirmDialog } from 'components/ui/index';
import { objTypeAndClassTypeMap, PAGE_ACTION, PICKLIST_FIELD_TYPE } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import {
  setAddedFieldAttr,
  resetAddedFieldAttr,
  fetchBackground,
  duplicatFilter,
  setFieldLableisDuplicate,
  deletePickListValue,
  addPickListValue,
  sortPicklistValueToRemote,
  replacePickListValueToRemote,
  updateFieldToRemote,
  addPickListValueToRemote,
} from '../flow/action';

import FieldForm from '../component/field/fieldForm';
import PickListValue from '../component/field/picklistValue';
import { fieldCategory } from '../flow/objectTypeHelper';

const { EDIT } = PAGE_ACTION;

class FieldEditContainer extends React.Component {
  constructor(props) {
    super(props);
    if (_.isEmpty(`${props.addedField.field.id}`)) {
      const { history, objectType } = props;
      history.push(`/setup/${objectType}/fields`);
    }
  }
  state = {
    deleteDialogVisible: false,
    selectedId: '',
    replaceValue: '',
  }
  onSubmit(field) {
    const data = {
      helper_text: field.helper_text,
      description: field.description,
    };
    const {
      updateFieldToRemote, objectType, history, addedField, fieldPrefix,
    } = this.props;
    if (addedField.category === fieldCategory.CUSTOM) {
      data.field_label = `${fieldPrefix}${field.field_label}`;
    }
    updateFieldToRemote(field.id, data, () => {
      history.push(`/setup/${objectType}/fields`);
    });
  }
  onCancel() {
    const {
      objectType, history,
    } = this.props;
    history.push(`/setup/${objectType}/fields`);
  }
  deleteDeactiveList(id) {
    this.setState({
      selectedId: id,
      deleteDialogVisible: true,
    });
  }
  cancelReplace() {
    this.setState({
      deleteDialogVisible: false,
    });
  }
  submitReplace() {
    const { replacePickListValueToRemote } = this.props;
    replacePickListValueToRemote(this.state.selectedId, this.state.replaceValue);
  }
  replacedChangeVal(val) {
    this.setState({
      replaceValue: val,
    });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      addedField,
      objectType,
      fieldPrefix,
      duplicatFilter,
      isDuplicate,
      setFieldLableisDuplicate,
      deletePickListValue,
      setAddedFieldAttr,
      addPickListValue,
      sortPicklistValueToRemote,
      replacePickListValueToRemote,
      addPickListValueToRemote,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];
    const deactiveEl = () => {
      if (!_.isEmpty(addedField.deactiveList)) {
        return (
          <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} contentClasses="pt-lg pb-lg">
            <table style={{ width: '100%' }}>
              <thead className="ant-table-thead">
                <tr>
                  <th>Action</th>
                  <th >Value</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {
                    Object.keys(addedField.deactiveList).map(val => (
                      <tr key={val.id}>
                        <td>
                          <Icon type="delete" className={`${classType}-theme-icon`} onClick={() => this.deleteDeactiveList(val.id)} />
                        </td>
                        <td>
                          { val.option_value }
                        </td>
                      </tr>))
                }
              </tbody>
            </table>
            <DeleteConfirmDialog visible={this.state.deleteDialogVisible} >
              <p>please select a value to replace</p>
              <Row>
                {
                    addedField.picklist.map((val) => {
                            if (val.id !== this.state.selectedId) {
                                return (
                                  <Col span={24} key={val.id}>
                                    <Radio
                                      value={val.id}
                                      onChange={() => this.replacedChangeVal(val.option_value)}
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
            </DeleteConfirmDialog>
          </Panel>
        );
      }
    };
    return (
      <Fragment>
        <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} contentClasses="pt-lg pb-lg">
          <FieldForm
            isDuplicate={isDuplicate}
            setFieldLableisDuplicate={setFieldLableisDuplicate}
            action={EDIT}
            editObject={addedField.field}
            ref={(c) => { this.form = c; }}
            objType={objectType}
            prefix={fieldPrefix}
            checkLabelDuplicate={duplicatFilter}
            onSubmit={values => this.onSubmit(values)}
            onCancel={() => this.onCancel()}
          />
        </Panel>

        {
          addedField.field.type === PICKLIST_FIELD_TYPE ?
            <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} contentClasses="pt-lg pb-lg">
              <div className="panel-section">
                <div className="section-header">Default Fields</div>
                <div className="section-content  mt-lg mb-lg">
                  <PickListValue
                    objectType={objectType}
                    action={EDIT}
                    editObject={addedField}
                    setAddedFieldAttr={setAddedFieldAttr}
                    deletePickListValue={deletePickListValue}
                    addPickListValue={addPickListValue}
                    sortPicklistValueToRemote={sortPicklistValueToRemote}
                    replacePickListValueToRemote={replacePickListValueToRemote}
                    addPickListValueToRemote={addPickListValueToRemote}
                  />
                </div>
              </div>
            </Panel> : ''
        }
        { deactiveEl() }


      </Fragment>
    );
  }
}

FieldEditContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const {
    addedField,
    isDuplicate,
  } = setup.fields.addField;
  return {
    addedField,
    isDuplicate,
    objectType: addedField.objType,
    fieldPrefix: global.settings.fields.cstm_attribute_prefix,
  };
};
const mapDispatchToProps = {
  setAddedFieldAttr,
  resetAddedFieldAttr,
  fetchBackground,
  duplicatFilter,
  setFieldLableisDuplicate,
  deletePickListValue,
  addPickListValue,
  sortPicklistValueToRemote,
  replacePickListValueToRemote,
  updateFieldToRemote,
  addPickListValueToRemote,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldEditContainer)));

