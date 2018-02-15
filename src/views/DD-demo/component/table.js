/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import operateType from 'components/page/LeadsAndAccountsEditAddDialog/flow/operateType';
import { Address, Username, Group } from 'components/ui/index';
import { Table, Divider, Icon, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { IdDialog, LeadsAndAccountsEditAddDialog } from 'components/page';
import HistoryOrderDialog from './historyOrderDialog';


class accountsTable extends React.Component {
  state = {
    userDialogVisible: false,
    editID: {},
    editAccounts: {},
    operatorType: operateType.VIEW,
    historyOrderDialogVisble: false,
    historyOrder: {
      profits: {
        most_bought_product: {
          name: '',
        },
        total_spending: 0,
        total_profits: 0,
      },
      invoices: [],
    },
  }
  closeUserDialog() {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: false,
      editAccounts: {},
    }));
  }
  handleIDClose() {
    const editID = Object.assign({}, this.state.editID, { visible: false });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleIDSave(idNumber, idFront, idBack) {
    const file = {
      front_id_doc: idFront,
      back_id_doc: idBack,
    };
    const postData = Object.assign({}, this.state.editLead, { file, id_number: idNumber });
    this.props.updateAccounts(postData);
    this.handleIDClose();
  }
  closeHistoryOrder() {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: false,
    }));
  }
  // table action 操作
  handleEditID(record) {
    let idFront = '';
    let idBack = '';
    const idNumber = record.id_number;
    const rejectReseason = 0;

    if (record.document && record.document.length > 0) {
      const { name, path } = record.document[0];
      if (name === 'front_id_doc') {
        idFront = path || '';
      } else {
        idBack = path || '';
      }
      if (record.document && record.document.length > 1) {
        const { name, path } = record.document[1];
        if (name === 'front_id_doc') {
          idFront = path || '';
        } else {
          idBack = path || '';
        }
      }
    }
    const editID = Object.assign({}, this.state.editID, {
      visible: true,
      userId: `${record.id}`,
      idFront,
      idBack,
      rejectReseason,
      idNumber,
      country: record.country,
    });
    this.setState(Object.assign({}, this.state, { editID, editLead: record }));
  }
  handleUserDetail(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      editAccounts: record,
      operatorType: operateType.VIEW,
    }));
  }
  handleEditAccounts(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      editAccounts: record,
      operatorType: operateType.EDIT,
    }));
  }
  handleHistoryOrder(historyOrder) {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: true,
      historyOrder,
    }));
  }
  render() {
    const { affiliatedClientStatus, groups } = this.props;
    const { formatMessage } = this.props.intl;
    const rejectObj = _.find(affiliatedClientStatus, { name: 'reject' });
    const approveObj = _.find(affiliatedClientStatus, { name: 'active' });
    const columns = [{
      title: formatMessage({ id: 'global.form.name' }),
      key: 'name',
      width: 150,
      render: (text, record) => <Username firstName={record.first_name} lastName={record.last_name} />,
    }, {
      title: formatMessage({ id: 'global.form.phone' }),
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    }, {
      title: formatMessage({ id: 'global.form.allAddress' }),
      render: (text, record) => <Address country={record.country} state={record.state} city={record.city} street={record.street} zipCode={record.zip_code} />,
      key: 'address',
      width: 150,
    }, {
      title: formatMessage({ id: 'global.form.email' }),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    }, {
      title: formatMessage({ id: 'global.form.group' }),
      key: 'group',
      render: (text, record) => <Group groupId={record.sub_group_id} />,
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 350,
      render: (text, record) => {
        const idBtnType = () => {
          if (Number(record.status) === (_.isEmpty(rejectObj) ? 0 : rejectObj.id)) {
            return 'primary';
          }
          if (Number(record.status) === (_.isEmpty(approveObj) ? 0 : approveObj.id)) {
            return 'danger';
          } return 'default';
        };

        const sendGoodsBtn = () => {
          if ((!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code))) {
            return (
              <span>
                <Divider type="vertical" />
                <Link to={`/clientLists/order?userId=${record.id}`} className="a-btn" onClick={() => { this.props.setOrderUser(record); }}>{formatMessage({ id: 'page.Leads.order' })}</Link>
              </span>
            );
          } return (<span><Divider type="vertical" /><Tooltip title={formatMessage({ id: 'page.Leads.complementAddressTip' })}><Icon type="warning" className="text-danger" /></Tooltip></span>);
        };
        const historyOrderEl = () => {
          if ((!_.isEmpty(record.invoices)) && (!_.isEmpty(record.profits))) {
            return (
              <span>
                <Divider type="vertical" />
                <Button
                  size="small"
                  onClick={() => {
               this.handleHistoryOrder(record);
             }}
                >{formatMessage({ id: 'page.Accounts.historyOrder' })}
                </Button>
              </span>
            );
          }
          return '';
        };
        return (
          <span>
            <Tooltip title={formatMessage({ id: 'page.Leads.userDetail' })}>
              <Icon type="user" onClick={() => { this.handleUserDetail(record); }} />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title={formatMessage({ id: 'page.Leads.editUser' })}>
              <Icon type="edit" onClick={() => { this.handleEditAccounts(record); }} />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
              <Button onClick={() => { this.handleEditID(record); }} size="small" type={idBtnType()}><Icon type="picture" />ID</Button>
            </Tooltip>
            { historyOrderEl() }
            { sendGoodsBtn() }
          </span>
        );
      },
    }];
    const {
      accountDataTablePagination, fetchAccounts, updateAccounts,
    } = this.props;
    const pagination = {
      defaultCurrent: accountDataTablePagination.currentPage,
      current: accountDataTablePagination.currentPage,
      defaultPageSize: accountDataTablePagination.perPage,
      pageSize: accountDataTablePagination.perPage,
      total: accountDataTablePagination.total,
      onChange(page, pageSize) {
        fetchAccounts(pageSize, page);
      },
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.accountsData}
          pagination={pagination}
          rowClassName={(record) => {
            const enable = (!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code));
            if (!enable) {
              return 'error-row';
            }
          }}
        />
        <IdDialog {...this.state.editID} onOk={(idNumber, idFront, idBack) => { this.handleIDSave(idNumber, idFront, idBack); }} onCancel={() => { this.handleIDClose(); }} rejectReseason={this.state.editAccounts.reject_reason_id || 0} />
        <LeadsAndAccountsEditAddDialog visible={this.state.userDialogVisible} editObject={this.state.editAccounts} onClose={() => { this.closeUserDialog(); }} userType="Accounts" operatorType={this.state.operatorType} update={updateAccounts} />
        <HistoryOrderDialog visible={this.state.historyOrderDialogVisble} onClose={() => { this.closeHistoryOrder(); }} historyOrder={this.state.historyOrder} />
      </div>
    );
  }
}
accountsTable.defaultProps = {
  affiliatedClientStatus: [],
  groups: [],
};
accountsTable.propTypes = {
  intl: intlShape.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  accountsData: PropTypes.array.isRequired,
  accountDataTablePagination: PropTypes.object.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  updateAccounts: PropTypes.func.isRequired,
  affiliatedClientStatus: PropTypes.array,
  groups: PropTypes.array,
};

const AccountsTable = injectIntl(accountsTable);
export default AccountsTable;
