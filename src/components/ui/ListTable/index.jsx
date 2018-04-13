import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);
import Enums from 'utils/EnumsManager';

const defaultProps = {
  theme: 'lead',
  columns: [],
  dataSource: [],
  pagination: {},
  isPaginationFixed: false,
};
const propTypes = {
  theme: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  isPaginationFixed: PropTypes.bool.isRequired,
};

// merge pagination from redux with static settings
const getPagination = (pagination, isFixed) => {
  const { current, pageSize, total } = pagination;
  return {
    ...pagination,
    pageSizeOptions: Enums.DefaultPageConfigs.Options,
    size: 'small',
    className: isFixed ? 'stickToRight' : '',
    showSizeChanger: isFixed ? true : false,
    showTotal: (total, range) => isFixed ? `${range[0]}-${range[1]} / ${total}` : `showing ${range[0]}-${range[1]} of ${total} items`,
  };
};

const getDataIndexByType = column => {
  if (column.crm_data_type === Enums.FieldTypes.Lookup) {
    return `${column.field_name}.${column.lookup_own_field_name}`;
  }
  return column.field_name;
};

const renderColumns = (data, onDeleteClick, theme) => {
  const columns = data.map(column => {
    let render = {};
    const dataIndex = column.crm_data_type
    if (column.field_name === 'name' || column.field_name === 'email') {
      render = {
        render: (text, record) => (
          <Link
            className={`${theme}-link`}
            to={`/leads/${record.id}`}
          >
            {text}
          </Link>
        ),
      };
    }
    return {
      title: column.field_label,
      key: column.id,
      dataIndex: getDataIndexByType(column),
      sorter: true,
      ...render
    }
  });

  columns.unshift({
    title: '',
    key: 'actions',
    width: 30,
    render: text => (
      <Popconfirm
        title="Are you sure to delete?"
        onConfirm={() => onDeleteClick(text.id)}
      >
        <Icon style={{ fontSize: 12 }} type='delete' />
      </Popconfirm>
    ),
  });
  return columns;
};

const ListTable = ({
  intl, 
  columns, isPaginationFixed,
  onDeleteClick,
  pagination,
  theme,
  
  // dataSource,
  // onChange,
  // rowSelection,
  ...other
}) => {

  return (
    <Table
      {...other}

      columns={renderColumns(columns, onDeleteClick, theme)}
      pagination={getPagination(pagination, isPaginationFixed)}
      scroll={{ x: 2000 }}
      rowKey={record => record.id}
      size="small"
      className={cx('listTable')}      
    />
  );
};

ListTable.defaultProps = defaultProps;
ListTable.propTypes = propTypes;
export default ListTable;