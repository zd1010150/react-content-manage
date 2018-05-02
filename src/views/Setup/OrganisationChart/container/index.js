/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import EditView from './editDepartmentView';
import SortView from './sortDepartmentView';


class organizationChartIndexView extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    const { isSortViewVisible, teams } = this.props;
    return (
      <Fragment>
        <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_ORGANISATIONALCHART} errorComponent={<Unauthentication />}>
        { isSortViewVisible && (!_.isEmpty(teams)) ? <SortView /> : <EditView />}
        </Permission>
      </Fragment>

    );
  }
}

const mapStateToProps = ({ global, setup }) => ({
  isSortViewVisible: setup.orgChart.ui.isSortViewVisible,
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(organizationChartIndexView);

