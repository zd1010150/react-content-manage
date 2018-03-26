/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';



class EmailTemplatesCampaign extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    return (
      null

    );
  }
}

const mapStateToProps = ({ global }) => ({
  teams: global.settings.teams,
});
const mapDispatchToProps = {
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesCampaign);

