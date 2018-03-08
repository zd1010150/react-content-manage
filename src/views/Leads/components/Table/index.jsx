import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListTable } from 'components/ui/index';
import Enums from 'utils/EnumsManager';

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

  onItemDelete = e => {
    debugger;
    // TODO: dispatch to delete
    this.props.deleteLead(e.target.dataset.id);
    // TODO: dispatch to refetch
  }

  onTableChange = (pagination, filters, sorter) => {
    debugger;
    // TODO: fetch on page change

    // TODO: fetch on sorter change -> sorter.field, sorter.order
    const { current, pageSize } = pagination;
    const { columnKey, order } = sorter;
    this.props.fetchByParams(current, pageSize, columnKey, order);
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
});
const mapDispatchToProps = {
  deleteLead,
  fetchByParams,
};
export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper);
