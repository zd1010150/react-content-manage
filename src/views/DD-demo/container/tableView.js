
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOrderUser } from 'store/global/action';
import Table from '../component/table';
import { fetchAccounts, updateAccounts } from '../flow/action';

class tableView extends React.Component {
  componentDidMount() {
    this.props.fetchAccounts();
  }
  render() {
    const { accountsData, setOrderUser, accountDataTablePagination, updateAccounts, fetchAccounts } = this.props;
    return (
      <Table setOrderUser={setOrderUser} accountsData={accountsData} accountDataTablePagination={accountDataTablePagination} fetchAccounts={fetchAccounts} updateAccounts={updateAccounts} />
    );
  }
}
tableView.defaultProps = {
  accountData: [],
};
tableView.propTypes = {
  accountsData: PropTypes.array,
  setOrderUser: PropTypes.func.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  updateAccounts: PropTypes.func.isRequired,
  accountDataTablePagination: PropTypes.object.isRequired,
};
const mapStateToProps = ({ accounts }) => ({
  accountsData: accounts.accountsData,
  accountDataTablePagination: accounts.accountsDataTablePagination
});
const mapDispatchToProp = {
  setOrderUser,
  fetchAccounts,
  updateAccounts,
};

const TableView = connect(mapStateToProps, mapDispatchToProp)(tableView);
export default TableView;
