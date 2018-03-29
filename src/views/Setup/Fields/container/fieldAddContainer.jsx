/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Icon, Radio, Col, Row, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap, PAGE_ACTION } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { setAddedFieldAttr, resetAddedFieldAttr, fetchBackground, duplicatFilter, setFieldLableisDuplicate } from '../flow/action';
import { FIELD_ADD, FIELD_TYPE_SELECT } from '../flow/pageAction';
import { getMappedTypes } from '../flow/reselect';
import FieldForm from '../component/field/fieldForm';

const { ADD, EDIT } = PAGE_ACTION;
const RadioGroup = Radio.Group;

class FieldAddSelecteTypeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBackground(this.props.objectType);
  }
    onTypesChange = (e) => {
      this.props.setAddedFieldAttr({ field: { type: e.target.value } });
    }
    save = () => {
      const { isDuplicate } = this.props;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && !isDuplicate) {
          debugger;
          console.log(values);
        }
      });
    }
    cancel =() => {
      const { history, resetAddedFieldAttr, objectType } = this.props;
      history.push(`/setup/fields?objectType=${objectType}`);
      resetAddedFieldAttr(objectType);
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRowKeys);
    }
    goPrevious() {
      const { history, objectType } = this.props;
      history.push(`/setup/fields?objectType=${objectType}&action=${FIELD_TYPE_SELECT}`);
    }
    render() {
      const { formatMessage, locale } = this.props.intl;
      const {
        addedField,
        objectType,
        types,
        layouts,
        fieldPrefix,
        duplicatFilter,
        isDuplicate,
        setFieldLableisDuplicate,
      } = this.props;
      const classType = objTypeAndClassTypeMap[objectType];
      const rowSelection = {
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
            if (_.isEmpty(record.assigned_to_teams.data)) {
              return record.assigned_to_teams.data.map(t => <Tag>{t.name}</Tag>);
            }
            return '';
          },
        },
      ];
      return (
        <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} contentClasses="pt-lg pb-lg">
          <FieldForm isDuplicate={isDuplicate} setFieldLableisDuplicate={setFieldLableisDuplicate} action={ADD} editObject={addedField.field} ref={(c) => { this.form = c; }} objType={objectType} prefix={fieldPrefix} checkLabelDuplicate={duplicatFilter} />
          <div className="panel-section">
            <div className="section-header">Default Fields</div>
            <div className="section-content  mt-lg mb-lg">
              <Table rowSelection={rowSelection} columns={columns} dataSource={layouts} />
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

FieldAddSelecteTypeContainer.propTypes = {
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
    types: getMappedTypes({ global }),
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
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldAddSelecteTypeContainer)));

