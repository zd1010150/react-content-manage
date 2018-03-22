import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Radio, Icon } from 'antd';
const RadioGroup = Radio.Group;

import { UsersList } from 'components/ui/index';
import { TeamTree } from 'components/page/index';
import Enums from 'utils/EnumsManager';
import { setVisibilityOption, selectTeam, fetchUsers, addEntityToSelection } from './flow/actions';
import { fetchTeams } from 'store/global/action';

const defaultProps = {
  theme: 'lead',
  assignOptions: [],
  selectedOption: Enums.ViewVisibilityIds.Me,
};
const propTypes = {
  theme: PropTypes.string.isRequired,
  assignOptions: PropTypes.array.isRequired,
  selectedOption: PropTypes.number.isRequired,
};

class ViewVisibility extends Component {
  componentDidMount() {
    this.props.fetchTeams();
    this.props.fetchUsers();
  }

  onOptionChange = e => this.props.setVisibilityOption(Number(e.target.value))

  handleSelect = teamIds => this.props.selectTeam(teamIds[0])

  handleRemoveItem = (itemId, teamId) => {
    if (!itemId) return;
    
    // this.props.removeItemFromSelection(itemId, teamId);
  }

  handleTeamSelection = id => {
    // id = Number(id);
    // if (id === Enums.NoTeamId) return;
    console.log(`--===team:${id}===--`);
    this.props.addEntityToSelection(id, true);
  }

  handleUserSelection = id => {
    console.log(`--===user:${id}===--`);
    this.props.addEntityToSelection(id);
  }

  render() {
    const {
      assignOptions,
      theme,
      teams,
      selectedOption,
      selectedTeamId,
      selectedUsers,
      selectedTeams,
      usersInTeam,
      title,
    } = this.props;

    return (
      <Fragment>
        <RadioGroup onChange={this.onOptionChange} value={selectedOption} >
          {assignOptions.map(option => (
            <Radio
              key={option.id}
              value={option.id}
              style={{ display: 'block', lineHeight: '24px' }}
              className={`${theme}-theme-radio`}
            >
              {option.display_value}
            </Radio>
          ))}
        </RadioGroup>
        <UsersList
          users={selectedUsers}
          teams={selectedTeams}
          showTeams
          canRemoveItem
          onRemoveItem={this.handleRemoveItem}
          userAddonBefore={<Icon className="mr-sm" type="user" size="small"/>}
          teamAddonBefore={<Icon type="team" size="small"/>}
        />
        {selectedOption !== Enums.ViewVisibilityIds.GroupsAndUsers && (
          <Row>
            <div style={{ color: 'red' }}>Click on a team name to show team members on the right section. Double click will select a specific user or team to share.</div>
            <Col xs={24} sm={8}>
              <TeamTree
                teams={teams}
                onSelect={this.handleSelect}
                onDbClick={this.handleTeamSelection}
              />
            </Col>
            <Col xs={24} sm={16}>
              <UsersList
                defaultTitle="Click Chart to Choose Department"
                title={title}
                withFilter
                showHeader
                users={usersInTeam}
                teamId={selectedTeamId}
                userAddonBefore={<Icon className="mr-sm" type="user" size="small"/>}
                teamAddonBefore={<Icon type="team" size="small"/>}
                onDoubleClick={this.handleUserSelection}
              />
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

ViewVisibility.defaultProps = defaultProps;
ViewVisibility.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  assignOptions: global.settings.assignOptions,
  selectedOption: objectView.visibilities.selectedOption,
  selectedTeamId: objectView.visibilities.selectedTeamId,
  selectedUsers: objectView.visibilities.selectedUsers,
  selectedTeams: objectView.visibilities.selectedTeams,
  teams: objectView.visibilities.teams,
  title: objectView.visibilities.title,
  usersInTeam: objectView.visibilities.usersInTeam,
});
const mapDispatchToProps = {
  setVisibilityOption,
  fetchTeams,
  selectTeam,
  fetchUsers,
  addEntityToSelection,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewVisibility);