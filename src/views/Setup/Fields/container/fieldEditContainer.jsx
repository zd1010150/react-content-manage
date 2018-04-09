/* eslint-disable no-shadow,react/prop-types */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
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
  setReplaceDialog,
  updatePickListValueStatusToRemote,
  fetchFieldDetailInfo,
  setPickListValueManagement,
} from '../flow/action';

import FieldForm from '../component/field/fieldForm';
import PickListValue from '../component/field/picklistValue';
import ReplaceDialog from '../component/field/replaceDialog';
import { fieldCategory } from '../flow/objectTypeHelper';

const { EDIT } = PAGE_ACTION;

class FieldEditContainer extends React.Component {
  componentDidMount() {
    this.fetchDetail(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.fetchDetail(nextProps);
    }
  }
  fetchDetail(props) {
    if (!_.isEmpty(`${props.addedField.field.id}`)) {
      props.fetchFieldDetailInfo(props.addedField.field.id);
    } else {
      const { history, objectType } = props;
      history.push(`/setup/${objectType}/fields`);
    }
  }
  onSubmit(field) {
    const data = {
      helper_text: field.helper_text,
      description: field.description,
    };
    const {
      updateFieldToRemote, objectType, history, addedField, fieldPrefix,
    } = this.props;
    if (addedField.field.category === fieldCategory.CUSTOM) {
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
  deleteDeactiveList(val) {
    const { setReplaceDialog, addedField } = this.props;
    setReplaceDialog({
      options: addedField.picklist.filter(v => v.id !== val.id),
      replacedValId: val.id,
      isVisible: true,
    });
  }
  activeDeactivedVal(val) {
    const { updatePickListValueStatusToRemote, fetchFieldDetailInfo, addedField } = this.props;
    updatePickListValueStatusToRemote(val.id, { active: 1 }, () => {
      fetchFieldDetailInfo(addedField.field.id);
    });
  }
  submitReplace() {
    const {
      replacePickListValueToRemote, replaceDialog, fetchFieldDetailInfo, addedField, setReplaceDialog,
    } = this.props;
    replacePickListValueToRemote(replaceDialog.replacedValId, replaceDialog.selectedOption.option_value, () => {
      fetchFieldDetailInfo(addedField.field.id);
      setReplaceDialog({
        isVisible: false,
      });
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      history,
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
      replaceDialog,
      setReplaceDialog,
      updatePickListValueStatusToRemote,
      fetchFieldDetailInfo,
      setPickListValueManagement,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];

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
                    setReplaceDialog={setReplaceDialog}
                    updatePickListValueStatusToRemote={updatePickListValueStatusToRemote}
                    fetchFieldDetailInfo={fetchFieldDetailInfo}
                    history={history}
                    setPickListValueManagement={setPickListValueManagement}
                  />
                </div>
              </div>
            </Panel> : ''
        }
        {
              addedField.field.type === PICKLIST_FIELD_TYPE && !_.isEmpty(addedField.deactiveList) ?
                <Panel panelClasses={`${classType}-theme-panel`} panelTitle="deactive" contentClasses="pt-lg pb-lg">
                  <table style={{ width: '100%' }}>
                    <thead className="ant-table-thead">
                      <tr>
                        <th>Action</th>
                        <th >Value</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {
                          addedField.deactiveList.map(val => (
                            <tr key={val.id} >
                              <td>
                                <Icon type="delete" className="pl-lg" onClick={() => this.deleteDeactiveList(val)} />
                                <Icon type="check-square" className={`${classType}-theme-icon`} onClick={() => this.activeDeactivedVal(val)} />
                              </td>
                              <td>
                                { val.option_value }
                              </td>
                            </tr>))
                      }
                    </tbody>
                  </table>
                  <ReplaceDialog {...replaceDialog} setReplaceDialog={setReplaceDialog} submitReplace={() => this.submitReplace()} />
                </Panel> : ''
          }


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
    replaceDialog: setup.fields.picklist.replaceDialog,
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
  setReplaceDialog,
  updatePickListValueStatusToRemote,
  fetchFieldDetailInfo,
  setPickListValueManagement,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldEditContainer)));

