import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

const defaultProps = {
  columns: [],
  dataSource: [],
  pagination: {},
  isPaginationFixed: false,
};
const propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  isPaginationFixed: PropTypes.bool.isRequired,
};

// merge pagination from redux with static settings
const getPagination = (pagination, isFixed) => {
  return {
    size: 'small',
    className: isFixed ? 'stickToRight' : '',
    total: 800,
    showSizeChanger: isFixed ? true : false,
    showTotal: (total, range) => isFixed ? `${range[0]}-${range[1]} / ${total}` : `showing ${range[0]}-${range[1]} of ${total} items`,
  };
};

const renderColumns = (data, onDeleteClick) => {
  const columns = data.map(column => {
    let render = {};
    if (column.field_name === 'name' || column.field_name === 'email') {
      render = {
        render: text => (
          <Link to={`/lead/${text.id}`}>{text}</Link>
        ),
      };
    }
    return {
      title: column.field_label,
      key: column.id,
      dataIndex: column.field_name,
      sorter: true,
      ...render
    }
  });

  columns.unshift({
    title: '',
    key: 'actions',
    width: 30,
    render: text => (
      <Icon
        data-id={text.id}
        style={{ fontSize: 12 }}
        type='delete'
        onClick={onDeleteClick}
      />
    ),
  });
  return columns;
};

const ListTable = ({
  intl, 
  columns, isPaginationFixed,
  onDeleteClick,
  pagination,
  // same name
  // {...other}
  dataSource,
  onChange,
  rowSelection,
}) => {

  return (
    <Table
      columns={renderColumns(columns, onDeleteClick)}      
      pagination={getPagination(pagination, isPaginationFixed)}
      scroll={{ x: 2000 }}
      rowKey={record => record.id}
      size="small"
      className={cx('listTable')}
      // {...other}
      dataSource={dataSource}
      onChange={onChange}
      rowSelection={rowSelection}
    />
  );
};

ListTable.defaultProps = defaultProps;
ListTable.propTypes = propTypes;
export default ListTable;