/* eslint-disable no-shadow */
import React from 'react';
import { Panel } from 'components/ui/index';
import { TeamTree } from 'components/page/index';
import { connect } from 'react-redux';
import { setTeams, fetchTeams } from 'store/global/action';


class UITeamTree extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    const { setTeams, teams } = this.props;
    return (
      <Panel>
        <TeamTree teams={teams} onSelect={(keys) => { console.log(keys.join(',')); }} />
        <TeamTree teams={teams} canAdd canDelete canModifyTeamName setTeams={setTeams} onSelect={(keys) => { console.log(keys.join(',')); }} />
      </Panel>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  teams: global.settings.teams,

});
const mapDispatchToProps = {
  setTeams,
  fetchTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(UITeamTree);
