import { Button, Col, Icon, Row } from 'antd';
import { Permission } from 'components/page/index';
import { PopDeleteConfirm } from 'components/ui/index';
import PERMISSIONS from 'config/app-permission.config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { MassUpdateModal } from './index';
import { tryUpdateClients, tryDeleteClientsByType } from '../flow/actions';

const { ThemeTypes, PhantomId, ObjectTypes, ThemeTypesInArray, ObjectTypesInArray } = Enums;
const { Leads } = ObjectTypes;


const defaultProps = {
  theme: ThemeTypes.Leads,
  objectType: Leads,
  selectedRowKeys: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
};

const colLayout = {
  sm: 12,
};
class Toolbar extends Component {
  state = {
    visible: false,
  }

  handleMassDelete = () => {
    const {
      objectType,
      selectedRowKeys,
      meta,
      tableParams,
      tryDeleteClientsByType,
      activeViewId,
    } = this.props;
    tryDeleteClientsByType(objectType, selectedRowKeys, tableParams, meta, activeViewId);
  }

  handleMassUpdate = (fieldName, value) => {
    const {
      selectedRowKeys,
      objectType,
      tableParams,
      tryUpdateClients,
      activeViewId,
    } = this.props;
    const params = {
      ids: selectedRowKeys,
      field_name: fieldName,
      value,
    };
    tryUpdateClients(params, objectType, tableParams, activeViewId);
    this.setState({ visible: false });
  }

  handleModalClose = () => this.setState({ visible: false })

  handleModalOpen = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state;
    const { intl, theme, objectType, selectedRowKeys } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';
    const btnConfigs = {
      className: `${theme}-theme-btn mr-sm btn-ellipse`,
      size: 'small',
    };
    const iconConfig = {
      className: 'font-sm',
    };

    return (
      <Row className="ml-lg mr-md mt-md mb-md">
        <Col {...colLayout} style={{ textAlign: 'left' }}>
          <Permission permission={PERMISSIONS[`${objectType.toUpperCase()}_MASSUPDATE`]}>
            <Button
              {...btnConfigs}
              disabled={selectedRowKeys.length < 2}
              onClick={this.handleModalOpen}
            >
              <Icon size="small" type="edit" {...iconConfig} />
              {formatMessage({ id: `${i18n}.massUpdate` })}
            </Button>
          </Permission>
          <MassUpdateModal
            visible={visible}
            onOk={this.handleMassUpdate}
            onCancel={this.handleModalClose}
            theme={theme}
          />
          <Permission permission={PERMISSIONS[`${objectType.toUpperCase()}_MASSDELETE`]}>
            <PopDeleteConfirm
              msgId="global.ui.dialog.massDelete"
              onConfirm={this.handleMassDelete}
            >
              <Button
                {...btnConfigs}
                disabled={selectedRowKeys.length < 2}
              >
                <Icon size="small" type="delete" {...iconConfig} />
                {formatMessage({ id: `${i18n}.massDelete` })}
              </Button>
            </PopDeleteConfirm>
          </Permission>
          <span className={`${theme}-theme-text ml-lg`}>
            {selectedRowKeys.length} {formatMessage({ id: 'global.ui.table.selectedItems' })}
          </span>
        </Col>
        <Col {...colLayout} style={{ textAlign: 'right' }}>
          {objectType === Leads && (
            <Permission permission={PERMISSIONS.LEADS_ADD}>
              <Link to={`/${objectType}/${PhantomId}`}>
                <Button {...btnConfigs}>
                  <Icon size="small" type="plus" {...iconConfig} />
                  {formatMessage({ id: 'global.ui.button.new' })}
                  {formatMessage({ id: `global.properNouns.${theme}` })}
                </Button>
              </Link>
            </Permission>
          )}
          <Button {...btnConfigs} disabled>
            {formatMessage({ id: `${i18n}.addToCampaign` })} (Coming Soon)
          </Button>
        </Col>
      </Row>
    );
  }
}


Toolbar.defaultProps = defaultProps;
Toolbar.propTypes = propTypes;
const mapStateToProps = ({ global, objectList }) => ({
  language: global.language,
  selectedRowKeys: objectList.selectedRowKeys,
  meta: objectList.meta,
  tableParams: objectList.tableParams,
  activeViewId: objectList.activeViewId,
});
const mapDispatchToProps = {
  tryDeleteClientsByType,
  tryUpdateClients,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Toolbar));
