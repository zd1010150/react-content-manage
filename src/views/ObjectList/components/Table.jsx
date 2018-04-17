import { Icon, Popconfirm, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { mapToAPIOrderStr } from 'utils/common';
import { toTimezone } from 'utils/dateTimeUtils';
import { setRowSelection, tryFetchData } from '../flow/actions';
const { FieldTypes } = Enums;
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


const defaultProps = {
  data: [],
  columns: [],
  meta: {},
};
const propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  tryFetchLeads: PropTypes.func,
};


class TableWrapper extends Component {
  componentDidMount() {
    // initial fetch
    const { objectType, tryFetchData } = this.props;
    tryFetchData(objectType);
  }

  handleSelectionChange = selectedRowKeys => this.props.setRowSelection(selectedRowKeys)

  handleTableChange = (pagination, filters, sorter) => {    
    const params = {
      orderBy: sorter.column.columnId,
      sortBy: mapToAPIOrderStr(sorter.order),
    };
    const { objectType, tryFetchData } = this.props;
    debugger;
    tryFetchData(objectType, params);
  }

  parsePagination = data => {
    return {
      className: 'stickToRight',
    };
  }

  renderColumnByType = (type, column) => {
    const configs = {
      title: column.field_label,
      dataIndex: column.field_name,
      columnId: column.id,  // customized property, used by table sorter
      sorter: true,
    };
    const extraConfigs = {};

    switch(type) {
      case DateOnly:
      case DateTime:
        extraConfigs.render = text => toTimezone(text, '+1100', 'YYYY-MM-DD');
        break;
      case Lookup:
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
    };

    return {
      ...configs,
      ...extraConfigs,
    };
  }

  renderColumns = data => {
    const me = this;
    const columns = data.map(column => me.renderColumnByType(column.crm_data_type, column));
    columns.unshift({
      title: '',
      key: 'actions',
      width: 30,
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => onDeleteClick(record.id)}
        >
          <Icon className="cursor-pointer" size="small" type='delete' />
        </Popconfirm>
      ),
    });
    return columns;
  }

  render() {
    const { intl, columns, data, meta, selectedRowKeys } = this.props;
    const { formatMessage } = intl;
    
    return (
      <Table
        columns={this.renderColumns(columns)}
        dataSource={data}
        onChange={this.handleTableChange}
        pagination={this.parsePagination(meta)}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: this.handleSelectionChange
        }}
        size="small"
      />
    );
  }
}


TableWrapper.defaultProps = defaultProps;
TableWrapper.propTypes = propTypes;
const mapStateToProps = ({ objectList }) => ({
  columns: objectList.columns,
  data: objectList.data,
  meta: objectList.meta,
  selectedRowKeys: objectList.selectedRowKeys,
});
const mapDispatchToProps = {
  setRowSelection,
  tryFetchData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TableWrapper));