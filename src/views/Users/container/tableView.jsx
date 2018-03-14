/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Modal, notification } from 'antd';
import { PAGE_ACTION } from 'config/app.config';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { FloatingLabelInput } from 'components/ui/index';
import { queryByPaging, queryBySearchKey, deleteUsers, setEditUser } from '../flow/action';

const { confirm } = Modal;

class usersTableView extends React.Component {
  componentDidMount() {
    this.props.queryByPaging();
  }
  searchUser(value) {
    this.props.queryBySearchKey(value);
  }
  edit(record) {
    const { setEditUser } = this.props;
    setEditUser(record);
    window.location = `/setup/company-info/users?action=${PAGE_ACTION.EDIT}`;
  }
  delete(id) {
    const { deleteUsers } = this.props;
    const { formatMessage } = this.props.intl;
    confirm({
      title: formatMessage({ id: 'global.ui.dialog.deleteTitle' }),
      onOk() {
        deleteUsers(id, () => {
          notification.open({
            message: formatMessage({ id: 'global.info.successDelete' }),
          });
        });
      },
      onCancel() {

      },
    });
  }
  render() {
    const { usersDataTablePagination, users, queryByPaging } = this.props;
    const { formatMessage } = this.props.intl;
    const rightActions = <Button key="addBtn" className="btn-ellipse ml-sm" size="small" icon="user-add" onClick={() => window.location = '/setup/company-info/users?action=add'}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}</Button>;

    const columns = [
      {
        title: formatMessage({ id: 'global.ui.table.action' }),
        key: 'id',
        render: (text, record) => (
          <span>
            <Icon type="edit" onClick={() => this.edit(record)} />
            <Icon type="delete" className="danger pl-lg" onClick={() => this.delete(text)} />
          </span>
        ),
      }, {
        title: formatMessage({ id: 'global.properNouns.users' }),
        dataIndex: 'name',
        key: 'name',
      }, {
        title: formatMessage({ id: 'global.properNouns.joinDate' }),
        dataIndex: 'join_date',
        key: 'join_date',
      }, {
        title: formatMessage({ id: 'global.properNouns.department' }),
        key: 'team',
        render: (team) => {
          if (!_.isEmpty(team.name)) {
            return team.name;
          }
          return '';
        },
      }, {
        title: formatMessage({ id: 'global.properNouns.leadPageLayout' }),
        dataIndex: 'address',
        key: 'address',
      },
    ];

    const pagination = {
      defaultCurrent: usersDataTablePagination.currentPage,
      current: usersDataTablePagination.currentPage,
      defaultPageSize: usersDataTablePagination.perPage,
      pageSize: usersDataTablePagination.perPage,
      total: usersDataTablePagination.total,
      size: 'small',
      onChange(page, pageSize) {
        queryByPaging(pageSize, page);
      },
    };
    return (
      <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions} contentClasses="pl-lg pr-lg pt-lg pb-lg">
        <FloatingLabelInput
          labelText={formatMessage({ id: 'page.users.searchUser' })}
          handleSearch={(value) => {
              this.searchUser(value);
          }}
          withSearch
        />
        <Table dataSource={users} columns={columns} pagination={pagination} className="mt-lg" rowKey="id" />
      </Panel>
    );
  }
}
usersTableView.propTypes = {
  intl: intlShape.isRequired,
  queryByPaging: PropTypes.func,
  queryBySearchKey: PropTypes.func,
};
const mapStateToProps = ({ setupUsers }) => {
  const { users, usersDataTablePagination } = setupUsers;
  return {
    users: users.users,
    usersDataTablePagination,
  };
};
const mapDispatchToProps = {
  queryByPaging,
  queryBySearchKey,
  deleteUsers,
  setEditUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(usersTableView));
