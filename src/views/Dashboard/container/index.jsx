import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'antd';
import LeftSection from '../components/leftSection';
import { fetchNewLeads, fetchNewAccounts, fetchLatestObject } from '../flow/action';
import styles from '../index.less';


const cx = classNames.bind(styles);

class Dashboard extends Component {
  componentDidMount() {
    const {
      fetchNewLeads,
      fetchNewAccounts,
      fetchLatestObject,
    } = this.props;
    fetchNewLeads();
    fetchNewAccounts();
    fetchLatestObject();
  }
  render() {
    const { leads, accounts, objects } = this.props;
    return (
      <div className={cx('dashboard-wrapper')}>
        <div className={cx('leftSection-wrapper')}>
          <LeftSection leads={leads} accounts={accounts} objects={objects} />
        </div>
        <div className={cx('right-section-wrapper')}>
                welcome!
        </div>
      </div>


    );
  }
}
const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});
const mapDispatchToProps = {
  fetchNewLeads,
  fetchNewAccounts,
  fetchLatestObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
