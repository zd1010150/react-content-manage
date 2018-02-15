/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Table from './tableView';

class accountView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.accounts');
  }
  render() {
    return (
      <section className="section section-page">
        <div className="section-content"><Table /></div>
        <div className="section-header" />
      </section>
    );
  }
}

accountView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapStateToProps = ({ accounts }) => ({
  idViews: accounts.idViews,
});
const mapDispatchToProp = {
  setPageTitle,
};

const AccountView = connect(mapStateToProps, mapDispatchToProp)(accountView);
export default AccountView;
