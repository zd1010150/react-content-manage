import { Icon, Table } from 'antd';
import { Permission } from 'components/page/index';
import { PopDeleteConfirm } from 'components/ui/index';
import PERMISSIONS from 'config/app-permission.config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { mapToAPIOrderStr } from 'utils/common';
import { toTimezone } from 'utils/dateTimeUtils';
import {
  setRowSelection,
  tryFetchDataByView,
  tryDeleteClientByType,
} from '../flow/actions';

const { FieldTypes, DefaultPageConfigs, PhantomId } = Enums;
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = FieldTypes;
const { Options, PageSize } = DefaultPageConfigs;


const propTypes = {
  activeViewId: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
  tableParams: PropTypes.object.isRequired,
  setRowSelection: PropTypes.func.isRequired,
  tryFetchDataByView: PropTypes.func.isRequired,
  tryDeleteClientByType: PropTypes.func.isRequired,
};


class TableWrapper extends Component {
  componentDidMount() {
    const { activeViewId, tryFetchDataByView, objectType } = this.props;
    tryFetchDataByView(
      this.props.objectType,
      activeViewId[objectType],
      { page: 1, per_page: PageSize },
    );
  }

  handleDeleteClick = (id) => {
    const {
      activeViewId,
      objectType,
      tryDeleteClientByType,
      tableParams,
      meta,
    } = this.props;
    tryDeleteClientByType(objectType, id, tableParams, meta, activeViewId[objectType]);
  }

  handleSelectionChange = selectedKeys => this.props.setRowSelection(selectedKeys)

  handleTableChange = (pagination, filters, sorter) => {
    let paginationParams = {};
    let sorterParams = {};
    if (!_.isEmpty(pagination)) {
      const { current, pageSize } = pagination;
      paginationParams = {
        page: current,
        per_page: pageSize,
      };
    }
    if (!_.isEmpty(sorter)) {
      sorterParams = {
        orderBy: sorter.column.columnId,
        sortedBy: mapToAPIOrderStr(sorter.order),
      }
    }
    const { activeViewId, objectType, tryFetchDataByView } = this.props;
    return tryFetchDataByView(objectType, activeViewId[objectType], { ...paginationParams, ...sorterParams });
  }

  parsePagination = (meta) => {
    const { pagination } = meta;
    let extraParams = {};
    if (!_.isEmpty(pagination)) {
      extraParams = {
        current: pagination.current_page,
        pageSize: pagination.per_page,
        total: pagination.total,
      };
    }
    return {
      className: 'stickToRight',
      defaultPageSize: PageSize,
      pageSizeOptions: Options,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      ...extraParams,
    };
  }

  renderColumnByType = (type, column) => {
    const configs = {
      title: column.field_label,
      dataIndex: column.field_name,
      // customized property 'columnId', used by table sorter
      columnId: column.id,
      sorter: true,
    };
    const extraConfigs = {};

    switch (type) {
      case DateOnly:
      case DateTime:
        extraConfigs.render = text => toTimezone(text, type === DateTime);
        break;
      case Lookup:
        if(column.field_name === 'target_account_id') {
          extraConfigs.render = (lookup, record) => (
            <Link
              className={`account-theme-text`}
              to={`accounts/${record.target_account_id.id}`}
            >
              {lookup}
            </Link>
          );
        }
        extraConfigs.dataIndex = `${column.field_name}.${column.lookup_own_field_name}`;
        break;
      case PickList:
      case Email:
      case LongText:
      case NumberInput:
      case TextInput:
        // As requested, we use Name and Email fields as a entry point to object details
        if (column.field_name === 'name'
            || column.field_name === 'email') {
          const { theme, objectType } = this.props;
          extraConfigs.render = (text, record) => (
            <Link
              className={`${theme}-theme-text`}
              to={`${objectType}/${record.id}`}
            >
              {text}
            </Link>
          );
        }
        break;
      default:
        throw new Error('No such type is found when set up column.');
    }

    return {
      ...configs,
      ...extraConfigs,
    };
  }

  renderColumns = (data) => {
    const { objectType } = this.props;
    const me = this;
    const columns = data.map(column => me.renderColumnByType(column.crm_data_type, column));
    columns.unshift({
      title: '',
      key: 'actions',
      width: 30,
      render: (text, record) => (
        <Permission permission={PERMISSIONS[`${objectType.toUpperCase()}_DELETE`]}>
          <PopDeleteConfirm
            onConfirm={() => me.handleDeleteClick(record.id)}
            placement="right"
          >
            <Icon className="cursor-pointer" size="small" type="delete" />
          </PopDeleteConfirm>
        </Permission>
      ),
    });
    return columns;
  }

  render() {
    const {
      columns,
      data,
      meta,
      selectedRowKeys,
    } = this.props;

    return (
      <Table
        columns={this.renderColumns(columns)}
        dataSource={data}
        onChange={this.handleTableChange}
        pagination={this.parsePagination(meta)}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: this.handleSelectionChange,
        }}
        size="small"
      />
    );
  }
}


TableWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectList }) => ({
  language: global.language,
  activeViewId: objectList.activeViewId,
  columns: objectList.columns,
  data: objectList.data,
  meta: objectList.meta,
  selectedRowKeys: objectList.selectedRowKeys,
  tableParams: objectList.tableParams,
});
const mapDispatchToProps = {
  setRowSelection,
  tryFetchDataByView,
  tryDeleteClientByType,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableWrapper);
