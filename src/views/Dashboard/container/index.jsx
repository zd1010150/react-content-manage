import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import LeftSection from '../components/leftSection';
import { fetchNewLeads, fetchNewAccounts, fetchLatestObject, fetchLatestActivity } from '../flow/action';
import styles from '../index.less';


const cx = classNames.bind(styles);

class Dashboard extends Component {
  componentDidMount() {
    const {
      fetchNewLeads,
      fetchNewAccounts,
      fetchLatestObject,
      fetchLatestActivity,
    } = this.props;
    fetchNewLeads();
    fetchNewAccounts();
    fetchLatestObject();
    fetchLatestActivity();
  }
  render() {
    const {
      leads, accounts, objects, activities, taskStatus,
    } = this.props;
    return (
      <div className={cx('dashboard-wrapper')}>
        <div className={cx('leftSection-wrapper')}>
          <LeftSection leads={leads} accounts={accounts} objects={objects} activities={activities} taskStatus={taskStatus} />
        </div>
        <div className={cx('right-section-wrapper')}>
                welcome!
        </div>
      </div>


    );
  }
}
const mapStateToProps = ({ dashboard, global }) => ({
  ...dashboard,
  taskStatus: global.settings.statuses,
});
const mapDispatchToProps = {
  fetchNewLeads,
  fetchNewAccounts,
  fetchLatestObject,
  fetchLatestActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
