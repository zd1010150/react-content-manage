/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import EditView from './editDepartmentView';


class EmailTemplates extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    const { teams } = this.props;
    return (
      <Fragment>
        <EditView />
      </Fragment>

    );
  }
}

const mapStateToProps = ({ global, setupOrgChart }) => ({
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplates);

