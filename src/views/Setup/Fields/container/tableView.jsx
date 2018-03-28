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
import { intlShape, injectIntl } from 'react-intl';
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import { fetchFields, toggleEditingStatus, setSelectedFields, changeMapping, saveFieldsMapping } from '../flow/action';
import { getToFieldsStatus } from '../flow/reselect';
import { FIELD_TYPE_SELECT, FIELD_EDIT, FIELD_ADD, PICKLIST_OPTION_EDIT } from '../flow/pageAction';
import FieldMappingInput from '../component/tableView/fieldMappingInput';
import RightSiderFields from '../component/tableView/rightSiderFields';

class FieldsTableView extends React.Component {
  componentDidMount() {
    this.props.fetchFields(this.props.objectType);
  }
  mappingField() {
    const { toggleRightSider, toggleEditingStatus } = this.props;
    toggleRightSider(false);
    toggleEditingStatus(true);
  }
  editField(field) {
    console.log(field.id, '---');
  }
  mapField(fromField, mapToOfFromField, fieldCategory, toObjectType, fromObjectType) {
    this.props.setSelectedFields({
      fromField, mapToOfFromField, fieldCategory, toObjectType, fromObjectType,
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      history,
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
      fetchFields,
      allFields,
    } = this.props;
    const rightActions = (() => {
      const actions = [];
      actions.push(<Button key="save" className={classNames('btn-ellipse', 'ml-sm', 'lead-theme-btn', isEditing ? '' : 'no-display')} size="small" icon="save" onClick={() => this.saveFieldsMapping(mappings)}>{ formatMessage({ id: 'global.ui.button.save' })}</Button>);
      actions.push(<Button key="cancel" className={classNames('btn-ellipse', 'ml-sm', 'lead-theme-btn', isEditing ? '' : 'no-display')} size="small" icon="close" onClick={() => fetchFields()}>{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>);
      actions.push(<Button key="addBtn" className={classNames('btn-ellipse', 'ml-sm', 'lead-theme-btn', !isEditing ? '' : 'no-display')} size="small" icon="plus" onClick={() => history.push(`/setup/fields?objectType=${objectType}&action=${FIELD_TYPE_SELECT}`)}>
        { formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.field' }) })}
      </Button>);
      actions.push(<Button key="viewAll" className={classNames('btn-ellipse', 'ml-sm', 'lead-theme-btn', !isEditing ? '' : 'no-display')} size="small" icon="eye" onClick={() => this.mappingField()}>{ formatMessage({ id: 'global.ui.button.edit' }, { actionType: formatMessage({ id: 'global.properNouns.field' }) })}</Button>);
      return actions;
    })();
    const getMappingTd = (field, fieldProp, mappingFields, fieldCategory) => {
      if (!_.isEmpty(mappingFields)) {
        return Object.keys(mappingFields).map((objType) => {
          if (!field.can_be_mapped) return <td> Cannot be mapped</td>;
          const fields = _.isEmpty(field[fieldProp][objType]) ? [] : field[fieldProp][objType];
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
        <td><Icon type="edit" className="ok" onClick={() => this.editField(f)} /></td>
        <td>{f.field_label}</td>
        {
            getMappingTd(f, 'map_to', toFields, fieldCategory)
        }
        {
            getMappingTd(f, 'map_from', fromFields, fieldCategory)
        }
        <td>{f.crm_data_type}</td>

      </tr>
    ));
    return (
      <Fragment>
        <Panel panelClasses="lead-theme-panel" panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions} contentClasses="pl-lg pr-lg pt-lg pb-lg" >
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
                      getFieldEl(mainFields, 'main')
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
                    getFieldEl(cstmFields, 'cstm')
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
const mapStateToProps = ({ setup }) => {
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
  };
};
const mapDispatchToProps = {
  fetchFields,
  toggleRightSider,
  toggleEditingStatus,
  setSelectedFields,
  changeMapping,
  saveFieldsMapping,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldsTableView)));
