/* eslint-disable no-shadow */
import React from 'react';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Modal, notification } from 'antd';
import { PAGE_ACTION } from 'config/app.config';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { FloatingLabelInput, DeleteConfirmDialog } from 'components/ui/index';
import { queryByPaging, queryBySearchKey, deleteUsers, fetchEditUser, setDepartment } from '../flow/action';
import { getTreeItemByKey } from 'utils/treeUtil';


const { confirm } = Modal;

class usersTableView extends React.Component {
    state={
      deleteDialogVisible: false,
      deleteId: '',
    }
    componentDidMount() {
      this.props.queryByPaging();
    }
    searchUser(value) {
      this.props.queryBySearchKey(value);
    }
    edit(id) {
      const self = this;
      this.props.fetchEditUser(id, (user) => {
        const { id, name } = getTreeItemByKey(self.props.teams, user.team_id);
        self.props.setDepartment({
          department_id: id,
          department_name: name,
        });
        self.props.history.push(`/setup/company-info/users?action=${PAGE_ACTION.EDIT}`);
      });
    }
    delete(id) {
      this.setState({
        deleteDialogVisible: true,
        deleteId: id,
      });
    }
    confirmDelete() {
      const { deleteUsers, queryByPaging, usersDataTablePagination } = this.props;
      deleteUsers(this.state.deleteId, () => {
        this.setState({
          deleteDialogVisible: false,
        });
        const { perPage, currentPage } = usersDataTablePagination;
        queryByPaging(perPage, currentPage);
      });
    }
    render() {
      const {
        usersDataTablePagination, users, queryByPaging, history,
      } = this.props;
      const { formatMessage } = this.props.intl;
      const rightActions = (<Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_USERS_ADD}>
        <Button
          key="addBtn"
          className="btn-ellipse ml-sm"
          size="small"
          icon="user-add"
          onClick={() => {
        history.push('/setup/company-info/users?action=add');
    }}
        >
          { formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}
        </Button>
      </Permission>);
      const columns = [
        {
          title: formatMessage({ id: 'global.ui.table.action' }),
          key: 'id',
          render: record => (
            <span>
              <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_USERS_UPDATE}> <Icon type="edit" onClick={() => this.edit(record.id)} /></Permission>
              <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_USERS_DELETE}><Icon type="delete" className="danger pl-sm" onClick={() => this.delete(record.id)} /></Permission>
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
          dataIndex: 'team.name',
        }, {
          title: formatMessage({ id: 'global.properNouns.leadPageLayout' }),
          dataIndex: 'page_layouts.data.leads.name',
        }, {
          title: formatMessage({ id: 'global.properNouns.accountPageLayout' }),
          dataIndex: 'page_layouts.data.accounts.name',
        },
        {
          title: formatMessage({ id: 'global.properNouns.opportunitiesPageLayout' }),
          dataIndex: 'page_layouts.data.opportunities.name',
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
        <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions} contentClasses="pt-lg pb-lg pl-lg pr-lg">


          <FloatingLabelInput
            labelText={formatMessage({ id: 'page.users.searchUser' })}
            handleSearch={(value) => {
              this.searchUser(value);
          }}
            withSearch
          />
          <Table dataSource={users} columns={columns} pagination={pagination} className="mt-lg" rowKey="id" size="small" />
          <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} >
            <h3>{ formatMessage({ id: 'global.ui.dialog.deleteTitle' })}</h3>
          </DeleteConfirmDialog>
        </Panel>
      );
    }
}
usersTableView.propTypes = {
  intl: intlShape.isRequired,
  queryByPaging: PropTypes.func,
  queryBySearchKey: PropTypes.func,
  fetchEditUser: PropTypes.func.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const { users, usersDataTablePagination, searchKey } = setup.users;
  return {
    teams: global.settings.teams,
    users: users.users,
    searchKey,
    usersDataTablePagination,
  };
};
const mapDispatchToProps = {
  queryByPaging,
  queryBySearchKey,
  deleteUsers,
  fetchEditUser,
  setDepartment,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(usersTableView)));
