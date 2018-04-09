/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { RightSider } from 'components/page/index';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import { fetchFields, toggleEditingStatus, setSelectedFields, changeMapping, saveFieldsMapping, setAddedFieldAttr, resetAddedFieldAttr } from '../flow/action';
import { getToFieldsStatus } from '../flow/reselect';
import { FIELD_TYPE_SELECT, FIELD_EDIT } from '../flow/pageAction';
import FieldMappingInput from '../component/tableView/fieldMappingInput';
import RightSiderFields from '../component/tableView/rightSiderFields';
import { fieldCategory } from '../flow/objectTypeHelper';

class FieldsTableView extends React.Component {
  componentDidMount() {
    this.props.fetchFields(this.props.objectType);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.objectType !== this.props.objectType) {
      this.props.fetchFields(nextProps.objectType);
    }
  }

  mappingField() {
    const { toggleRightSider, toggleEditingStatus } = this.props;
    toggleRightSider(false);
    toggleEditingStatus(true);
  }
  editField(field, category) {
    const {
      fieldPrefix, history, objectType, setAddedFieldAttr,
    } = this.props;
    setAddedFieldAttr({
      objectType,
      field: {
        id: field.id,
        name: category === fieldCategory.CUSTOM ? field.field_name.slice(fieldPrefix.length) : field.field_name,
        notnull: Boolean(field.notnull),
        type: field.crm_data_type,
        label: field.field_label,
        length: field.length,
        scale: field.scale,
        precision: field.precision,
        helpText: field.helper_text,
        description: field.description,
        category,
      },
      picklist: field.picklists,
    });
    history.push(`/setup/${objectType}/fields?action=${FIELD_EDIT}`);
  }
  mapField(fromField, mapToOfFromField, fieldCategory, toObjectType, fromObjectType) {
    this.props.setSelectedFields({
      fromField, mapToOfFromField, fieldCategory, toObjectType, fromObjectType,
    });
  }
  addNewField() {
    const { history, objectType, resetAddedFieldAttr } = this.props;
    resetAddedFieldAttr(objectType);
    history.push(`/setup/${objectType}/fields?action=${FIELD_TYPE_SELECT}`);

  }
  coloseEditing() {
    const {
      toggleRightSider, toggleEditingStatus, fetchFields, objectType,
    } = this.props;
    fetchFields(objectType);
    toggleRightSider(true);
    toggleEditingStatus(false);
  }
  cancelEditing() {
    this.coloseEditing();
  }
  saveMappingFields() {
    const { saveFieldsMapping, mappings } = this.props;
    saveFieldsMapping(mappings, () => {
      this.coloseEditing();
    });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      objectType,
      mainFields,
      cstmFields,
      fromFields,
      toFields,
      toFieldsStatus,
      isEditing,
      selectedField,
      changeMapping,
      saveFieldsMapping,
      mappings,
      allFields,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];
    const rightActions = (() => {
      const actions = [];
      actions.push(<Button
        key="save"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`, isEditing ? '' : 'no-display')}
        size="small"
        icon="save"
        onClick={() => this.saveMappingFields()}
      >
        { formatMessage({ id: 'global.ui.button.save' })}
      </Button>);
      actions.push(<Button
        key="cancel"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`, isEditing ? '' : 'no-display')}
        size="small"
        icon="close"
        onClick={() => this.cancelEditing()}
      >
        { formatMessage({ id: 'global.ui.button.cancel' })}
      </Button>);
      actions.push(<Button
        key="addBtn"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`, !isEditing ? '' : 'no-display')}
        size="small"
        icon="plus"
        onClick={() => this.addNewField()}
      >
        { formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.field' }) })}
      </Button>);
      actions.push(<Button
        key="viewAll"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`, !isEditing ? '' : 'no-display')}
        size="small"
        icon="eye"
        onClick={() => this.mappingField()}
      >
        { formatMessage({ id: 'global.ui.button.edit' }, { actionType: formatMessage({ id: 'global.properNouns.field' }) })}
                   </Button>);
      return actions;
    })();
    const getMappingTd = (field, fieldProp, mappingFields, fieldCategory) => {
      if (!_.isEmpty(mappingFields)) {
        return Object.keys(mappingFields).map((objType) => {
          if (!field.can_be_mapped) return <td key={objType}> Cannot be mapped</td>;
          let fields = [];
          if (!_.isEmpty(field[fieldProp][objType])) {
            if (fieldProp === 'map_from') {
              fields = [field[fieldProp][objType]];
            } else {
              fields = field[fieldProp][objType];
            }
          }
          return (
            <td key={objType}>
              <FieldMappingInput disabled={fieldProp === 'map_from'} fields={fields} field={field} isEditing={isEditing} onSearch={(field, Fields) => this.mapField(field, Fields, fieldCategory, objType, objectType)} onClick={(field, Fields) => this.mapField(field, Fields, fieldCategory, objType, objectType)} />
            </td>
          );
        });
      }
    };
    const getFieldEl = (fields, fieldCategory) => fields.map(f => (
      <tr key={f.id}>
        <td><Icon type="edit" className={`${classType}-theme-icon`} onClick={() => this.editField(f, fieldCategory)} /></td>
        <td>{f.field_label}</td>
        {
              getMappingTd(f, 'map_from', fromFields, fieldCategory)
          }
        {
            getMappingTd(f, 'map_to', toFields, fieldCategory)
        }

        <td>{f.crm_data_type}</td>

      </tr>
    ));
    return (
      <Fragment>
        <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions} contentClasses="pt-lg pb-lg" >
          <div className="panel-section">
            <div className="section-header">Default Fields</div>
            <div className="section-content  mt-lg mb-lg">
              <table style={{ width: '100%' }}>
                <thead className="ant-table-thead">
                  <tr>
                    <th>Action</th>
                    <th >Field Label</th>
                    {
                        Object.keys(fromFields).map(objType => <th key={objType}>Map from {objType}</th>)
                      }
                    {
                          Object.keys(toFields).map(objType => <th key={objType}>Map to {objType}</th>)
                      }
                    <th>Date Type</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {
                      getFieldEl(mainFields, fieldCategory.MAIN)
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="panel-section">
            <div className="section-header">Customer Fields</div>
            <div className="section-content  mt-lg mb-lg">
              <table style={{ width: '100%' }}>
                <thead className="ant-table-thead">
                  <tr>
                    <th>Action</th>
                    <th >Field Label</th>
                    {
                        Object.keys(fromFields).map(objType => <th key={objType}>Map from {objType}</th>)
                    }
                    {
                        Object.keys(toFields).map(objType => <th key={objType}>Map to {objType}</th>)
                    }
                    <th>Date Type</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {
                    getFieldEl(cstmFields, fieldCategory.CUSTOM)
                }
                </tbody>
              </table>
            </div>
          </div>
        </Panel>
        <RightSider>
          <RightSiderFields
            fromField={selectedField.fromField}
            allFields={allFields}
            fieldCategory={selectedField.fieldCategory}
            fromObjectType={objectType}
            toObjectType={selectedField.toObjectType}
            fields={toFieldsStatus[selectedField.toObjectType] || []}
            onChange={args => changeMapping(Object.assign({}, { fieldCategory: selectedField.fieldCategory }, args))}
          />
        </RightSider>
      </Fragment>
    );
  }
}
FieldsTableView.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,

};
const mapStateToProps = ({ setup, global }) => {
  const {
    currentObject, relativeFields, ui, selectedField,
  } = setup.fields.tableView;
  const { main, cstm, mappings } = currentObject.fields;
  const { from, to } = relativeFields;
  return {
    mappings,
    allFields: currentObject.fields,
    objectType: currentObject.objType,
    mainFields: main,
    cstmFields: cstm,
    fromFields: from,
    toFields: to,
    toFieldsStatus: getToFieldsStatus(setup),
    isEditing: ui.isEditing,
    selectedField,
    fieldPrefix: global.settings.fields.cstm_attribute_prefix,
  };
};
const mapDispatchToProps = {
  fetchFields,
  toggleRightSider,
  toggleEditingStatus,
  setSelectedFields,
  changeMapping,
  saveFieldsMapping,
  setAddedFieldAttr,
    resetAddedFieldAttr,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldsTableView)));
