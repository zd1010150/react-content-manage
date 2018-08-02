import { Input, Table, Tooltip, Icon } from 'antd';
import { DeleteConfirmButton } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { activateCell, deactivateCell, deleteItemById, setColumnValue } from '../../flow/itemsList/actions';

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
    quantity: PropTypes.string,
    unitPrice: PropTypes.string,
    editingCol: PropTypes.string,
    isEditingAll: PropTypes.bool.isRequired,
  })).isRequired,
};

class ItemsTable extends Component {
  getColumnConfig = (col) => {
    const { formatMessage } = this.props.intl;
    const i18n = 'global.ui.table';
    const pageI18n = 'page.invoice.tips';

    let customConfig;
    switch (col) {
      case Description:
        customConfig = {
          title: (
            <Fragment>
              {formatMessage({ id: `${i18n}.${col}` })}
              <Tooltip title={formatMessage({ id: `${pageI18n}.${col}` })}>
                <Icon type="question-circle" className="font-sm ml-sm icon-thinner" />
              </Tooltip>
            </Fragment>
          ),
        };
        break;
      case Code:
        customConfig = {
          title: (
            <Fragment>
              {formatMessage({ id: `${i18n}.${col}` })}
              <Tooltip title={formatMessage({ id: `${pageI18n}.${col}` })}>
                <Icon type="question-circle" className="font-sm ml-sm icon-thinner" />
              </Tooltip>
            </Fragment>
          ),
        };
        break;
      // NOTES: In order to simplify the process, we use text input for quantity and unit price columns as well.
      //        And formatting value in reducer when editing status is off.
      case Quantity:
      case UnitPrice:
        break;
      case Action:
        customConfig = {
          render: this.ActionRenderer,
        };
        break;
      case Total:
        customConfig = {
          title: (
            <Fragment>
              {formatMessage({ id: `${i18n}.${col}` })}
              <Tooltip title={formatMessage({ id: `${pageI18n}.${col}` })}>
                <Icon type="question-circle" className="font-sm ml-sm icon-thinner" />
              </Tooltip>
            </Fragment>
          ),
          render: (text, record) => (record.quantity * record.unitPrice).toFixed(2),
        };
        break;
      default:
        break;
    }
    return {
      dataIndex: `${col}`,
      width: col === Action ? '10%' : '18%',
      title: formatMessage({ id: `${i18n}.${col}` }),
      onCell: record => ({
        onDoubleClick: () => this.props.activateCell(record.id, col),
        onBlur: () => this.handleCellBlur(record.id, col),
      }),
      render: (text, record) => this.TextRenderer(text, record, `${col}`),
      ...customConfig,
    };
  }

  handleCellBlur = (id, column) => this.props.deactivateCell(id, column)
  handleCellChange = (id, column, newValue) => this.props.setColumnValue(id, column, newValue)

  ActionRenderer = (text, record) => <DeleteConfirmButton onConfirm={() => this.props.deleteItemById(record.id)} />
  TextRenderer = (text, record, column) => {
    if (record.isEditingAll
        || (record.editingCol && record.editingCol === column)) {
      return (
        <Input
          className="text-center"
          size="small"
          onChange={e => this.handleCellChange(record.id, column, e.target.value)}
          value={text}
        />
      );
    }
    return text;
  }

  renderColumns = () => ColumnsInArray.map(col => this.getColumnConfig(col))

  render() {
    const { data } = this.props;

    return (
      <Table
        className="fixedTable textCenter itemsList"
        columns={this.renderColumns()}
        dataSource={data}
        bordered
        size="small"
        pagination={false}
        rowKey="id"
        onRow={record => ({
          'data-item-id': record.id,
        })}
      />
    );
  }
}


ItemsTable.defaultProps = defaultProps;
ItemsTable.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  data: invoice.itemsList,
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
