import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Currency } from 'components/ui/index';
import styles from '../Accounts.less';

const cx = classNames.bind(styles);
class historyOrderDialog extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { historyOrder } = this.props;
    const columns = [{
      title: formatMessage({ id: 'global.properNouns.orderNo' }),
      dataIndex: 'order_number',
      key: 'order_number',
    }, {
      title: formatMessage({ id: 'global.properNouns.totalPrice' }),
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: formatMessage({ id: 'global.properNouns.orderDate' }),
      dataIndex: 'order_time',
      key: 'order_time',
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      render: (text, record) => (
        <span>
          <a download href={record.pdf_url} target="_blank">{
          formatMessage({ id: 'global.ui.button.view' }, {
            file: formatMessage({ id: 'global.properNouns.invoice' }),
          })
        }
          </a>
        </span>
      ),
    }];

    return (
      <div>
        <div className={classNames(cx('shorter-mb-block'), 'block')}>
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Accounts.general' }) }</strong>
          </div>
          <div className="block-content">
            <dl className={cx('dl-infos')}>
              <dt className={cx('dt-info-title')}>{ formatMessage({ id: 'page.Accounts.mostBoughtItem' }) }:</dt>
              <dd className={cx('dt-info-value')}>{ historyOrder.profits.most_bought_product.name}</dd>
              <dt className={cx('dt-info-title')}>{ formatMessage({ id: 'page.Accounts.totalSpending' }) }:</dt>
              <dd className={cx('dt-info-value')}><Currency value={historyOrder.profits.total_spending} /></dd>
              <dt className={cx('dt-info-title')}>{ formatMessage({ id: 'page.Accounts.totalProfit' }) }:</dt>
              <dd className={cx('dt-info-value')}><Currency value={historyOrder.profits.total_profits} /></dd>
            </dl>
          </div>
        </div>
        <div className={classNames(cx('shorter-mb-block'), 'block')}>
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Accounts.historyOrder' }) }</strong>
          </div>
          <div className="block-content">
            <Table columns={columns} dataSource={historyOrder.invoices} rowKey="id" />
          </div>
        </div>
      </div>
    );
  }
}

historyOrderDialog.propTypes = {
  intl: intlShape.isRequired,
  historyOrder: PropTypes.object.isRequired,
};
const HistoryOrderDialog = injectIntl(historyOrderDialog);
export default HistoryOrderDialog;
