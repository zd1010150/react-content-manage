import { Icon, Input, Row, Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
// import { } from '../../flow/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class SummaryTable extends Component {
  constructor(props) {
    super(props);
    this.columnKeys = {
      description: 'description',
      addition: 'addition',
      total: 'total',
    };
    this.rowKeys = {
      rowTotal: 'rowTotal',
      tax: 'tax',
      grandTotal: 'grandTotal',
    };
  }

  handleAddNewRow = () => this.props.addNewRow()

  handleCellBlur = (e, id) => this.props.updateRecordOnBlur(id, e.target.value, e.target.dataset.name)

  editableCellRenderer = (text, record) => {
    return null;
  }

  renderColumns = () => {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    const {
      description,
      addition,
      total,
    } = this.columnKeys;
    const {
      rowTotal,
      tax,
      grandTotal,
    } = this.rowKeys;

    const colWidth = '33%';
    return [
      {
        dataIndex: `${description}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${description}` })}</div>,
        render: (text, record) => {
          if ([rowTotal, tax, grandTotal].indexOf(text) < 0) {
            return null;
          }

          return (
            <div className="text-center">
              {formatMessage({ id: `page.invoice.table.${text}` })}
              <Tooltip title={formatMessage({ id: `page.invoice.tips.${text}` })}>
                <Icon type="question-circle" style={{ fontWeight: 400 }} className="ml-sm" />
              </Tooltip>
            </div>
          );
        },
      },
      {
        dataIndex: `${addition}`,
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${addition}` })}</div>,
        render: this.editableCellRenderer,
      },
      {
        dataIndex: 'total',
        width: colWidth,
        title: <div className="text-center">{formatMessage({ id: `${i18n}.${total}` })}</div>,
        render: (text, record) => <div className="text-center">{text}</div>,
      },
    ];
  }

  render() {
    const { intl, summary } = this.props;
    const { formatMessage } = intl;

    return (
      <Row className="mb-xlg">
        <Table
          title={() => formatMessage({ id: 'page.invoice.summaryTableTitle' })}
          className="fixedTable labelHeader"
          columns={this.renderColumns()}
          dataSource={summary}
          bordered
          pagination={false}
          rowKey="id"
        />
      </Row>
    );
  }
}


SummaryTable.defaultProps = defaultProps;
SummaryTable.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  summary: invoice.itemDetails.summary,
});
const mapDispatchToProps = {
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(SummaryTable));
