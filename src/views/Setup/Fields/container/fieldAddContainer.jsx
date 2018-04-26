/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Col, Row, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap, PAGE_ACTION, PICKLIST_FIELD_TYPE } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import {
  setFieldAttr,
  setAddedFieldAttr,
  resetAddedFieldAttr,
  fetchBackground,
  duplicatFilter,
  setFieldLableisDuplicate,
  deletePickListValue,
  addPickListValue,
  sortPicklistValueToRemote,
  replacePickListValueToRemote,
  saveFieldToRemote,
} from '../flow/action';
import { FIELD_TYPE_SELECT } from '../flow/pageAction';
import FieldForm from '../component/field/fieldForm';
import PickListValue from '../component/field/picklistValue';

const { ADD } = PAGE_ACTION;

class FieldAddContainer extends React.Component {
  constructor(props) {
    super(props);
    if (_.isEmpty(props.addedField.field.type)) {
      const { history, objectType } = props;
      history.push(`/setup/${objectType}/fields?action=${FIELD_TYPE_SELECT}`);
    }
  }
  componentDidMount() {
    this.props.fetchBackground(this.props.objectType);
  }

    save = () => {
      const {
        isDuplicate, saveFieldToRemote, objectType, addedField, history, resetAddedFieldAttr, fieldPrefix,
      } = this.props;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && !isDuplicate) {
          const create_data = Object.assign(values, {
            field_name: `${fieldPrefix}${values.field_name}`,
            crm_data_type: addedField.field.type,
            notnull: _.isEmpty(`${values.notnull}`) ? false : values.notnull,
          });
          const picklist = addedField.picklist;
          const append_page_layout_ids = addedField.appendPageLayoutIds;
          saveFieldToRemote(objectType, { create_data, picklist, append_page_layout_ids }, () => {
            history.push(`/setup/${objectType}/fields`);

            resetAddedFieldAttr(objectType);
          });
        }
      });
    }
    cancel =() => {
      const { history, resetAddedFieldAttr, objectType } = this.props;
      history.push(`/setup/${objectType}/fields`);
      resetAddedFieldAttr(objectType);
    }
    onSelectChange = (selectedRowKeys) => {
      const { setAddedFieldAttr } = this.props;
      setAddedFieldAttr({ appendPageLayoutIds: selectedRowKeys });
    }
    goPrevious() {
      const { history, objectType } = this.props;
      history.push(`/setup/${objectType}/fields?action=${FIELD_TYPE_SELECT}`);
    }
    render() {
      const { formatMessage } = this.props.intl;
      const {
        addedField,
        objectType,
        layouts,
        fieldPrefix,
        duplicatFilter,
        isDuplicate,
        setFieldLableisDuplicate,
        deletePickListValue,
        setAddedFieldAttr,
        addPickListValue,
        sortPicklistValueToRemote,
        replacePickListValueToRemote,
        setFieldAttr,
      } = this.props;
      const classType = objTypeAndClassTypeMap[objectType];
      const rowSelection = {
        selectedRowKeys: addedField.field.notnull ? layouts.map(l => l.id) : addedField.appendPageLayoutIds,
        onChange: this.onSelectChange,
      };
      const columns = [
        {
          title: formatMessage({ id: 'page.fields.pageLaoyoutName' }),
          dataIndex: 'name',
          key: 'name',
        }, {
          title: formatMessage({ id: 'page.fields.department' }),
          key: 'department',
          render: (text, record) => {
            if (!_.isEmpty(record.assigned_to_teams.data)) {
              return record.assigned_to_teams.data.map(t => <Tag key={t.id}>{t.name}</Tag>);
            }
            return '';
          },
        },
      ];
      return (
        <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'page.fields.createField' }, { type: addedField.field.type })} contentClasses="pt-lg pb-lg">
          <FieldForm
            isDuplicate={isDuplicate}
            setFieldLableisDuplicate={setFieldLableisDuplicate}
            action={ADD}
            editObject={addedField.field}
            ref={(c) => { this.form = c; }}
            objType={objectType}
            prefix={fieldPrefix}
            checkLabelDuplicate={duplicatFilter}
            setFieldAttr={setFieldAttr}
          />

          {
              addedField.field.type === PICKLIST_FIELD_TYPE ?
                <div className="panel-section">
                  <div className="section-header">{ formatMessage({ id: 'page.fields.picklistValue' }) }</div>
                  <div className="section-content  mt-lg mb-lg">
                    <PickListValue
                      objectType={objectType}
                      action={ADD}
                      editObject={addedField}
                      setAddedFieldAttr={setAddedFieldAttr}
                      deletePickListValue={deletePickListValue}
                      addPickListValue={addPickListValue}
                      sortPicklistValueToRemote={sortPicklistValueToRemote}
                      replacePickListValueToRemote={replacePickListValueToRemote}
                    />
                  </div>
                </div> : ''
            }
          <div className="panel-section">
            <div className="section-header">{ formatMessage({ id: 'page.fields.addingPagelayoutToDepartment' }) }</div>
            <div className="section-content  mt-lg mb-lg">
              <Table rowSelection={rowSelection} columns={columns} dataSource={layouts} rowKey="id" pagination={false} />
            </div>
          </div>
          <Row className="pt-lg pl-lg pr-lg">
            <Col span={12}>
              <Button
                key="cancel"
                type="danger"
                icon="left"
                size="small"
                onClick={() => this.goPrevious()}
              >{ formatMessage({ id: 'global.ui.button.previous' })}
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                key="save"
                size="small"
                type="primary"
                icon="save"
                onClick={() => this.save()}
              >{ formatMessage({ id: 'global.ui.button.save' })}
              </Button>
            </Col>
          </Row>
        </Panel>
      );
    }
}

FieldAddContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const {
    addedField,
    backgroundInfo,
    isDuplicate,
  } = setup.fields.addField;
  return {
    addedField,
    isDuplicate,
    objectType: addedField.objType,
    fieldPrefix: global.settings.fields.cstm_attribute_prefix,
    layouts: backgroundInfo.layouts,
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
  saveFieldToRemote,
  setFieldAttr,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldAddContainer)));

