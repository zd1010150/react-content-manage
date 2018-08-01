import { Input, Table, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { activateCell, deactivateCell, deleteItemById, setColumnValue } from '../../flow/itemsList/actions';
import { DeleteConfirmButton } from 'components/ui/index';

const { Columns, ColumnsInArray } = Enums.Invoice.ItemsList;
const {
  Action,
  Description,
  Code,
  Quantity,
  UnitPrice,
  Total,
} = Columns;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  // TODO: lift it up to util/prop checks
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    code: PropTypes.string,
    quantity: PropTypes.number,
    unitPrice: PropTypes.number,
    editingColName: PropTypes.string,
    isEditingAll: PropTypes.bool.isRequired,
  })).isRequired,
};

class ItemsTable extends Component {
  onCellChange = (id, column, newValue) => this.props.setColumnValue(id, column, newValue)

  getColumnConfig = (col) => {
    const { formatMessage } = this.props.intl;
    const i18n = 'global.ui.table';

    let renderer;
    switch (col) {
      case Description:
      case Code:
        renderer = (text, record) => this.TextRenderer(text, record, `${col}`);
        break;
      case Quantity:
      case UnitPrice:
        renderer = (text, record) => this.NumberRenderer(text, record, `${col}`);
        break;
      case Action:
        renderer = this.ActionRenderer;
        break;
      case Total:
        renderer = (text, record) => record.quantity * record.unitPrice;
        break;
      default:
        renderer = null;
    }
    return {
      dataIndex: `${col}`,
      width: '20%',
      title: formatMessage({ id: `${i18n}.${col}` }),
      onCell: record => ({
        onDoubleClick: () => this.props.activateCell(record.id, col),
        onBlur: () => this.handleCellBlur(record.id, col),
      }),
      render: renderer,
    };
  }

  handleCellBlur = (id, column) => this.props.deactivateCell(id, column)  
  ActionRenderer = (text, record) => <DeleteConfirmButton onConfirm={() => this.props.deleteItemById(record.id)} />
  TextRenderer = (text, record, column) => {
    if (record.isEditingAll
        || (record.editingCol && record.editingCol === column)) {
      return (
        <Input
          className="text-center"
          size="small"
          onChange={e => this.onCellChange(record.id, column, e.target.value)}
          // onBlur={() => this.handleCellBlur(record.id, column)}
          onFocus={e => console.log('testing on cell with onfocus')}
          value={text}
        />
      );
    }
    return text;
  }
  NumberRenderer = (text, record) => {
    return text;
  }

  renderColumns = () => ColumnsInArray.map(col => this.getColumnConfig(col))

  render() {
    const { data } = this.props;

    return (
      <Table
        className="fixedTable textCenter"
        columns={this.renderColumns()}
        dataSource={data}
        bordered
        size="small"
        pagination={false}
        rowKey="id"
        onRow={record => ({
          // TODO: add onFocus on tbody level, and check on every onblur


          // probably need to compare focus target to determine if we need to deactivate the whole row.
          // it depends on focus/blur related event triggered order.
          onFocus: (e) => console.log(`focus on => ${record.id}`),
          // TODO: testing purpose to check if onBlur in React with propagation capability by default
          // NOTES: focus on diff cells of same row will trigger this part as well. so the on blur of Antd is propagated
          onBlur: (e) => { console.log(`blur from record id => ${record.id}`); },
        })}
      />
    );
  }
}


ItemsTable.defaultProps = defaultProps;
ItemsTable.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  data: invoice.itemsList.data,
});
const mapDispatchToProps = {
  activateCell,
  deactivateCell,
  deleteItemById,
  setColumnValue,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ItemsTable));
