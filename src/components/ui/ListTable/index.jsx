import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'antd';
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

const renderColumns = (data, onDeleteClick, theme) => {
  const columns = data.map(column => {
    let render = {};
    if (column.field_name === 'name' || column.field_name === 'email') {
      render = {
        render: (text, record) => (
          <Link
            className={`${theme}-link`}
            to={`/${theme}/${record.id}`}
          >
            {text}
          </Link>
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
  theme,
  
  // dataSource,
  // onChange,
  // rowSelection,
  ...other
}) => {

  return (
    <Table
      columns={renderColumns(columns, onDeleteClick, theme)}
      pagination={getPagination(pagination, isPaginationFixed)}
      scroll={{ x: 2000 }}
      rowKey={record => record.id}
      size="small"
      className={cx('listTable')}

      {...other}
    />
  );
};

ListTable.defaultProps = defaultProps;
ListTable.propTypes = propTypes;
export default ListTable;