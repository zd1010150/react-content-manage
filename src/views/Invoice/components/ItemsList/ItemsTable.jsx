import { Icon, Input, Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { } from '../../flow/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  setActiveRecord: PropTypes.func.isRequired,
};

class ItemsTable extends Component {
  constructor(props) {
    super(props);
    this.columnKeys = {
      description: 'itemDescription',
      code: 'itemCode',
      quantity: 'quantity',
      unitPrice: 'unitPrice',
      total: 'total',
    };
  }

  handleCellBlur = (e, id) => {}

  editableCellRenderer = (text, record, colName) => {
    if (!record.active
      || record.activeCol !== colName) {
      return <div className="text-center" data-name={colName}>{text}</div>;
    }

    const {
      description,
      code,
      quantity,
      unitPrice,
    } = this.columnKeys;
    const value = record[record.activeCol];
    switch (record.activeCol) {
      case description:
      case code:
      case quantity:
      case unitPrice:
        return (
          <Input
            className="text-center"
            size="small"
            defaultValue={value}
            data-name={colName}
            onBlur={e => this.handleCellBlur(e, record.id)}
          />
        );
      default:
        return null;
    }
  }
  
  renderColumns = () => {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    const {
      description,
      code,
      quantity,
      unitPrice,
      total,
    } = this.columnKeys;

    const colWidth = '20%';
    return [
      {
        dataIndex: `${description}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${description}` })}</div>,
        render: (text, record) => this.editableCellRenderer(text, record, `${description}`),
      },
      {
        dataIndex: `${code}`,
        width: colWidth,
        title: (
          <div className="text-center">
            {formatMessage({ id: `${i18n}.${code}` })}
            <Tooltip title="Item number or SKU">
              <Icon type="question-circle" style={{ fontWeight: 400 }} className="ml-sm" />
            </Tooltip>
          </div>
        ),
        render: (text, record) => this.editableCellRenderer(text, record, `${code}`),
      },
      {
        dataIndex: `${quantity}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${quantity}` })}</div>,
        render: (text, record) => this.editableCellRenderer(text, record, `${quantity}`),
      },
      {
        dataIndex: `${unitPrice}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${unitPrice}` })}</div>,
        render: (text, record) => this.editableCellRenderer(text, record, `${unitPrice}`),
      },
      {
        dataIndex: `${total}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${total}` })}</div>,
        render: (text, record) => <div className="text-center">{record.quantity * record.unitPrice}</div>,
      },
    ];
  }

  render() {
    const { data } = this.props;

    return (
      <Table
        className="fixedTable"
        columns={this.renderColumns()}
        dataSource={data}
        bordered
        pagination={false}
        rowKey="id"
        onRow={record => ({
          onDoubleClick: (e) => {
            let colName;
            if (e.target.dataset.name) {
              colName = e.target.dataset.name;
            } else if (e.target.firstChild.dataset) {
              colName = e.target.firstChild.dataset.name;
            }
            return this.props.setActiveRecord(record.id, colName);
          },
        })}
      />
    );
  }
}


ItemsTable.defaultProps = defaultProps;
ItemsTable.propTypes = propTypes;
const mapStateToProps = ({ invoice }) => ({
  data: invoice.itemsList.data,
});
const mapDispatchToProps = {
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ItemsTable));
