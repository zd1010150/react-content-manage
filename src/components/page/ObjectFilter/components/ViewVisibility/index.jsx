import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Radio, Icon, Button, Checkbox } from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

import { UsersList, Modal } from 'components/ui/index';
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
  state = {
    showModal: false,
    showTreeSection: false,
    checkedValues: [],
  }

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

  handleUserOrTeamBtnClick = e => {
    this.setState({
      showTreeSection: !this.state.showTreeSection,
    });
  }

  handleUserBtnClick = e => {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleModalSave = e => {
    // sync checkboxes to redux
    const { checkedValues } = this.state;
    console.log('on modal save');
    console.log(checkedValues);
    // this.props.addEntityToSelection(checkedValues);
    this.setState({
      checkedValues,
      showModal: !this.state.showModal,
    });
  }

  handleModalCancel = e => {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleCheckboxChange = checkedValues => {
    console.log(checkedValues);
  }

  render() {
    const { showModal, showTreeSection, checkedValues } = this.state;

    const {
      assignOptions,
      theme,
      teams,
      users,
      selectedOption,
      selectedTeamId,
      selectedUsers,
      selectedTeams,
      usersInTeam,
      title,
    } = this.props;

    //test
    const usersTest = [
      {
        id: 1,
        name: 'test1',
      },
      {
        id: 2,
        name: 'test2',
      },
      {
        id: 3,
        name: 'test3',
      },
    ]
    // ends
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
            <Button size="small" onClick={this.handleUserBtnClick}>
              Add User to Share
            </Button>
            <Modal
              visible={showModal}
              onOk={this.handleModalSave}
              onCancel={this.handleModalCancel}
            >
              <CheckboxGroup onChange={this.handleCheckboxChange}>
                <Row>
                  {usersTest.map(user => (
                    <Col xs={12}>
                      <Checkbox key={user.id} value={user.id}>{user.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </CheckboxGroup>
            </Modal>
            <Button size="small" onClick={this.handleUserOrTeamBtnClick}>
              Add User or Team to Share
              <Icon size="small" type={showTreeSection ? 'caret-up' : 'caret-down'} />
            </Button>
          </Row>
        )}
        {showTreeSection && (
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
  users: objectView.visibilities.users,
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