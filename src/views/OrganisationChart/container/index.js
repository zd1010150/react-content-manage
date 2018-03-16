/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
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
        { isSortViewVisible && (!_.isEmpty(teams)) ? <SortView /> : <EditView />}
      </Fragment>

    );
  }
}

const mapStateToProps = ({ global, setupOrgChart }) => ({
  isSortViewVisible: setupOrgChart.ui.isSortViewVisible,
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(organizationChartIndexView);

