import { Icon, Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { StyledAdditionSelector } from 'components/ui/index';
import { activatedRowByKey, deactivatedRowByKey, setRowValueByKey } from '../../flow/summary/actions';

const {
  Columns,
  ColumnsInArray,
  Rows,
} = Enums.Invoice.Summary;
const {
  SDescription,
  SAddition,
  STotal,
} = Columns;
const {
  Subtotal,
  Tax,
  GrandTotal,
} = Rows;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.string.isRequired,
    unitPrice: PropTypes.string.isRequired,
  })).isRequired,
  summary: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    addition: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
  })).isRequired,
};

class Summary extends Component {
  constructor(props) {
    super(props);
    this[Subtotal] = '0';
    this[Tax] = '0';
  }

  getColumnConfig = (col) => {
    const { intl, items, operators } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';
    const pageI18n = 'page.invoice';

    let customConfig = {};
    switch (col) {
      case SDescription:
        customConfig = {
          render: (text, record) => formatMessage({ id: `${pageI18n}.descriptions.${record.getRowKey()}` }),
        };
        break;
      case SAddition:
        customConfig = {
          render: (text, record) => {
            if (record.getRowKey() === GrandTotal) {
              return null;
            }
            return (
              <StyledAdditionSelector
                addition={record.addition}
                operator={record.operator}
                operators={operators}
                onAdditionChange={e => this.handleAdditionChange(record.getRowKey(), e.target.value)}
                onOperatorChange={newValue => this.handleOperatorChange(record.getRowKey(), newValue)}
                onAdditionBlur={() => this.handleAdditionBlur(record.getRowKey())}
                isActivated={record.isEditing}
              />
            );
          },
        };
        break;
      case STotal:
        customConfig = {
          render: (text, record) => this.getTotalByRow(record.getRowKey(), record),
        };
        break;
      default:
        break;
    }
    return {
      dataIndex: col,
      width: '33%',
      title: col === STotal ? (
        <Fragment>
          {formatMessage({ id: `${i18n}.${col}` })}
          <Tooltip title={formatMessage({ id: `${pageI18n}.tips.${col}` })}>
            <Icon type="question-circle" className="font-sm ml-sm icon-thinner" />
          </Tooltip>
        </Fragment>
      ) : formatMessage({ id: `${i18n}.${col}` }),
      onCell: record => ({
        onDoubleClick: () => this.handleAdditionDbClick(record.getRowKey()),
      }),
      ...customConfig,
    };
  }
  getSubtotal = (val, operator, data) => {
    const prices = data.map(item => item.quantity * item.unitPrice);
    const total = prices.reduce((accumulator, currentVal) => accumulator + currentVal, 0);
    console.log(`===SUBTOTALBEFORE===${total}`);
    const addition = Number(val);
    switch (operator) {
      case 'add':
        return total + addition;
      case 'sub':
        return total - addition;
      case 'add_percentage':
        return total * (1 + (addition / 100));
      case 'sub_percentage':
        return total * (1 - (addition / 100));
      default:
        return 0;
    }
  }
  getTax = (val, operator, base) => {
    const addition = Number(val);
    switch (operator) {
      case 'add':
        return base + addition;
      case 'sub':
        return base - addition;
      case 'add_percentage':
        return base * (addition / 100);
      case 'sub_percentage':
        return base * (addition / -100);
      default:
        return 0;
    }
  }
  getTotalByRow = (rowKey, record) => {
    const { items } = this.props;

    let total = null;
    switch (rowKey) {
      case Subtotal:
        total = this.getSubtotal(record.addition, record.operator, items);
        this[Subtotal] = total;
        break;
      case Tax:
        // TODO: confirm if tax calculation should based on items' total or calculated subtotal
        total = this.getTax(record.addition, record.operator, this[Subtotal]);
        this[Tax] = total;
        break;
      case GrandTotal:
        total = Number(this[Subtotal]) + Number(this[Tax]);
        break;
      default:
        break;
    }
    return total;
  }
  handleAdditionDbClick = (rowKey) => {
    console.log(`Row focus -> ${rowKey}`);
    this.props.activatedRowByKey(rowKey);
  }
  handleAdditionBlur = (rowKey) => {
    console.log(`Row blur -> ${rowKey}`);
    this.props.deactivatedRowByKey(rowKey);
  }
  handleAdditionChange = (rowKey, newValue) => {
    console.log(`Row add change -> ${rowKey} - ${newValue}`);
    this.props.setRowValueByKey(rowKey, 'addition', newValue);
  }
  handleOperatorChange = (rowKey, newValue) => {
    console.log(`Row op change -> ${rowKey} - ${newValue}`);
    this.props.setRowValueByKey(rowKey, 'operator', newValue);
  }
  renderColumns = () => ColumnsInArray.map(col => this.getColumnConfig(col), this)

  render() {
    const { intl, summary } = this.props;
    const { formatMessage } = intl;
    const pageI18n = 'page.invoice.titles';

    return (
      <Fragment>
        <div className="mb-sm ant-form-item-label" style={{ lineHeight: 1.5 }}>
          {formatMessage({ id: `${pageI18n}.summary` })}
        </div>
        <Table
          className="fixedTable textCenter"
          dataSource={summary}
          columns={this.renderColumns()}
          size="small"
          rowKey="description"
          pagination={false}
          bordered
        />
      </Fragment>
    );
  }
}

Summary.defaultProps = defaultProps;
Summary.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  items: invoice.itemsList,
  summary: invoice.summary,
  operators: global.settings.invoice.operators,
});
const mapDispatchToProps = {
  activatedRowByKey,
  deactivatedRowByKey,
  setRowValueByKey,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Summary));
