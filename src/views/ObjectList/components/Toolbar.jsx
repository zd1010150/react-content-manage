import { Button, Col, Icon, Row, Popconfirm } from 'antd';
import { StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
const { ThemeTypes, PhantomId, ObjectTypes, ThemeTypesInArray, ObjectTypesInArray } = Enums;
import { MassUpdateModal } from './index';
const { Leads } = ObjectTypes;
import { connect } from 'react-redux';
import { tryUpdateClients, tryDeleteClientsByType } from '../flow/actions';


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

  handleMassDelete = $ => {
    const { objectType, selectedRowKeys, meta, tableParams, tryDeleteClientsByType } = this.props;
    tryDeleteClientsByType(objectType, selectedRowKeys, tableParams, meta);
  }

  handleMassUpdate = (fieldName, value) => {
    const { selectedRowKeys, objectType, tableParams, tryUpdateClients } = this.props;
    const params = {
      ids: selectedRowKeys,
      field_name: fieldName,
      value,
    };
    tryUpdateClients(params, objectType, tableParams);
    this.setState({ visible: false });
  }

  handleModalClose = $ => this.setState({ visible: false })

  handleModalOpen = $ => this.setState({ visible: true })

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
      className: 'icon-thinner font-sm',
    };

    return (
      <Row className="ml-lg mr-md mt-md mb-md">
        <Col {...colLayout} style={{ textAlign: 'left' }}>
          <Button
            { ...btnConfigs }
            disabled={selectedRowKeys.length < 2}
            onClick={this.handleModalOpen}
          >
            <Icon size="small" type="edit" {...iconConfig} />
            {formatMessage({ id: `${i18n}.massUpdate` })}
          </Button>
          <MassUpdateModal
            visible={visible}
            onOk={this.handleMassUpdate}
            onCancel={this.handleModalClose}
          />
          <Popconfirm
            title={formatMessage({ id: 'global.ui.dialog.deleteTitle' })}
            onConfirm={this.handleMassDelete}
            okText={formatMessage({ id: `${i18n}.ok` })}
            cancelText={formatMessage({ id: `${i18n}.cancel` })}
          >
            <Button
              { ...btnConfigs }
              disabled={selectedRowKeys.length < 2}
            >
              <Icon size="small" type="delete" {...iconConfig} />
              {formatMessage({ id: `${i18n}.massDelete` })}
            </Button>
          </Popconfirm>
          <span className={`${theme}-theme-text ml-lg`}>
            {selectedRowKeys.length} {formatMessage({ id: 'global.ui.table.selectedItems' })}
          </span>
        </Col>
        <Col {...colLayout} style={{ textAlign: 'right' }}>
          {objectType === Leads && (
            <Link to={`/${objectType}/${PhantomId}`}>
              <Button { ...btnConfigs }>
                <Icon size="small" type="plus" {...iconConfig} />
                {formatMessage({ id: `global.properNouns.${theme}` })}
              </Button>
            </Link>
          )}
          <Button { ...btnConfigs } disabled={true}>
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
});
const mapDispatchToProps = {
  tryDeleteClientsByType,
  tryUpdateClients,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Toolbar));