/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Icon, Radio, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { setAddedFieldAttr, resetAddedFieldAttr } from '../flow/action';
import { FIELD_ADD } from '../flow/pageAction';
import { getMappedTypes } from '../flow/reselect';

const RadioGroup = Radio.Group;

class FieldAddSelecteTypeContainer extends React.Component {
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
  render() {
    const { formatMessage, locale } = this.props.intl;
    const {
      addedField,
      objectType,
      types,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];
    return (
      <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'global.properNouns.users' })} contentClasses="pt-lg pb-lg">
        <table style={{ width: '100%' }}>
          <thead className="ant-table-thead">
            <tr>
              <th>Date Type</th>
              <th >Description</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">

            {
                  Object.keys(types).map(type => (
                    <tr key={type}>
                      <td>
                        <Radio value={type} className={`${classType}-theme-radio`} onChange={this.onTypesChange} checked={addedField.field.type === type}>{types[type].label}</Radio>
                      </td>
                      <td>
                        {
                                  types[type].describe[locale]
                              }
                      </td>
                    </tr>
                  ))
              }

          </tbody>
        </table>
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
  } = setup.fields.addField;
  return {
    addedField,
    objectType: addedField.objType,
    types: getMappedTypes({ global }),
  };
};
const mapDispatchToProps = {
  setAddedFieldAttr,
  resetAddedFieldAttr,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldAddSelecteTypeContainer)));
