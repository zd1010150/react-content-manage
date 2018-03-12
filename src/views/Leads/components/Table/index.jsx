import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListTable } from 'components/ui/index';
import { mapToAPIOrderStr } from 'utils/common';
import { fetchByParams, deleteLead } from './flow/actions';

const defaultProps = {
};
const propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  onSelectChange: PropTypes.func.isRequired,
};

class TableWrapper extends Component {
  componentDidMount() {
    this.props.fetchByParams();
  }

  onItemDelete = id => {
    const { pagination, sorter, activeId } = this.props;
    const { current, pageSize } = pagination;
    const { orderBy, sortedBy } = sorter;
    this.props.deleteLead(id, {
      current, pageSize, orderBy, sortedBy, activeId
    });
  }

  onTableChange = (pagination, filters, sorter) => {
    const { activeId } = this.props;
    const { current, pageSize } = pagination;
    const { columnKey, order } = sorter;
    // Antd only provide two sort orders, both values are not match with API requirements,
    // so we have to change the value for backend
    const mappedOrder = mapToAPIOrderStr(order);
    this.props.fetchByParams(current, pageSize, columnKey, mappedOrder, activeId);
  }

  render() {
    console.log('re-render');
    const { selectedIds, onSelectChange, data, columns, pagination } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedIds,
      onChange: onSelectChange
    };

    return (
      <ListTable
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
        onChange={this.onTableChange}
        onDeleteClick={this.onItemDelete}
        pagination={pagination}
        isPaginationFixed
        theme="lead"
      />
    );
  }
}

TableWrapper.defaultProps = defaultProps;
TableWrapper.propTypes = propTypes;
const mapStateToProps = ({ leads }) => ({
  columns: leads.table.columns,
  data: leads.table.data,
  pagination: leads.table.pagination,
  sorter: leads.table.sorter,
  activeId: leads.filter.activeId,
});
const mapDispatchToProps = {
  fetchByParams,
  deleteLead,
};
export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper);
