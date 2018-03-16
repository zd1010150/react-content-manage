/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import EditView from './editDepartmentView';
import SortView from './sortDepartmentView';


class organizationChartIndexView extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    const { isSortViewVisible } = this.props;
    return (
      <Fragment>
        { isSortViewVisible ? <SortView /> : <EditView />}
      </Fragment>

    );
  }
}

const mapStateToProps = ({ setupOrgChart }) => ({
  isSortViewVisible: setupOrgChart.ui.isSortViewVisible,
});
const mapDispatchToProps = {
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(organizationChartIndexView);

