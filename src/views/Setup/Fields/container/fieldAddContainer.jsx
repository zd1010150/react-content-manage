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
import { setAddedFieldAttr, resetAddedFieldAttr, fetchBackground } from '../flow/action';
import { FIELD_ADD } from '../flow/pageAction';
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
    goNext = () => {
      const { history, objectType } = this.props;
      history.push(`/setup/fields?objectType=${objectType}&action=${FIELD_ADD}`);
    }
    cancel =() => {
      const { history, resetAddedFieldAttr, objectType } = this.props;
      history.push(`/setup/fields?objectType=${objectType}`);
      resetAddedFieldAttr(objectType);
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRowKeys);
    }
    render() {
      const { formatMessage, locale } = this.props.intl;
      const {
        addedField,
        objectType,
        types,
        layouts,
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
          <FieldForm action={ADD} editObject={addedField.field} ref={(c) => { this.form = c; }} />
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
                icon="close"
                size="small"
                onClick={this.cancel}
              >{ formatMessage({ id: 'global.ui.button.cancel' })}
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                key="save"
                size="small"
                disabled={_.isEmpty(addedField.field.type)}
                type="primary"
                icon="save"
                onClick={this.goNext}
              >{ formatMessage({ id: 'global.ui.button.next' })}
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
  } = setup.fields.addField;
  return {
    addedField,
    objectType: addedField.objType,
    types: getMappedTypes({ global }),
    layouts: backgroundInfo.layouts,
  };
};
const mapDispatchToProps = {
  setAddedFieldAttr,
  resetAddedFieldAttr,
  fetchBackground,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldAddSelecteTypeContainer)));

