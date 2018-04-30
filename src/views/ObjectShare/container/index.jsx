import { Button, Col, Icon, Row } from 'antd';
import { TeamTree } from 'components/page/index';
import { Panel, SearchPool, SelectionModal, SelectionPool } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';
import { tryFetchAllTeamsIfNeeded, tryFetchAllUsersIfNeeded } from 'store/global/action';
import {
  changeSelections,
  removeFromSelection,
  setActiveTeam,
  tryFetchShareTo,
  updateSelection,
  tryUpdateShares,
} from '../flow/actions';

const { DetailTools, ObjectTypes } = Enums;
const { Sharing } = DetailTools;
const { Leads, Accounts } = ObjectTypes;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.oneOf([Leads, Accounts]).isRequired,
  sharedTeams: PropTypes.array.isRequired,
  sharedUsers: PropTypes.array.isRequired,
  tryFetchShareTo: PropTypes.func.isRequired,
};


class ObjectShare extends Component {
  state = {
    showModal: false,
    showTreeSection: false,
  }

  componentDidMount() {
    const {
      objectId,
      objectType,
      tryFetchShareTo,
      tryFetchAllUsersIfNeeded,
      tryFetchAllTeamsIfNeeded,
    } = this.props;
    tryFetchShareTo(objectType, objectId);
    tryFetchAllUsersIfNeeded();
    tryFetchAllTeamsIfNeeded();
  }

  handleTagClose = (tagId, isTeam) => this.props.removeFromSelection(tagId, isTeam)

  handleUserBtnClick = () => this.setState({ showModal: !this.state.showModal })

  handleModalCancel = () => this.setState({ showModal: !this.state.showModal })

  handleModalSave = (checkedValues) => {
    const { changeSelections, users } = this.props;
    changeSelections(checkedValues, users);
    this.setState({ showModal: !this.state.showModal });
  }

  handleCancelClick = () => this.props.history.goBack()

  handleSaveClick = () => {
    const {
      objectId,
      objectType,
      sharedTeams,
      sharedUsers,
      tryUpdateShares,
    } = this.props;
    const params = {
      share_to_teams: sharedTeams.map(team => team.id),
      share_to_users: sharedUsers.map(user => user.id),
    };
    tryUpdateShares(objectType, objectId, params);
  }

  handleSelect = (selectedTeam) => {
    const { setActiveTeam, flatTeams, users } = this.props;
    setActiveTeam(selectedTeam[0], flatTeams, users);
  }

  handleUserOrTeamBtnClick = () => this.setState({ showTreeSection: !this.state.showTreeSection })

  handleTeamSelection = (id) => {
    const { flatTeams, updateSelection } = this.props;
    const record = flatTeams.find(team => team.id == id);
    updateSelection(id, record, true, false);
  }

  handleUserSelection = (id, record, isTeam) => this.props.updateSelection(id, record, isTeam, false)

  render() {
    const { showModal, showTreeSection } = this.state;
    const {
      intl,
      objectType,
      sharedTeams,
      sharedUsers,
      users,
      teams,
      usersInTeam,
      title,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.objectFilter.visibility';
    const theme = getThemeByType(objectType);

    return (
      <Panel
        panelTitle={formatMessage({ id: `global.ui.detailTools.${Sharing}` })}
        panelClasses={`${theme}-theme-panel`}
        contentClasses="pb-md pt-md pl-lg pr-lg"
      >
        <SelectionPool
          theme={theme}
          users={sharedUsers}
          teams={sharedTeams}
          onTagClose={this.handleTagClose}
          closable
          withIcon
        />
        <Row className="mt-md mb-md">
          <Button className="mr-sm" size="small" onClick={this.handleUserBtnClick}>
            {formatMessage({ id: `${i18n}.buttons.addUserToShare` })}
          </Button>
          <SelectionModal
            theme={theme}
            data={users}
            selectedData={sharedUsers}
            title={formatMessage({ id: `${i18n}.buttons.addUserToShare` })}
            visible={showModal}
            onOk={this.handleModalSave}
            onCancel={this.handleModalCancel}
          />
          <Button size="small" onClick={this.handleUserOrTeamBtnClick}>
            {formatMessage({ id: `${i18n}.buttons.addUserOrTeamToShare` })}
            <Icon size="small" style={{ fontSize: 11 }} type={showTreeSection ? 'caret-up' : 'caret-down'} />
          </Button>
        </Row>
        {showTreeSection && (
          <Row>
            <div style={{ color: 'red' }}>{formatMessage({ id: `${i18n}.treeHelpText` })}</div>
            <Col xs={24} sm={8}>
              <TeamTree
                teams={teams}
                onSelect={this.handleSelect}
                onDbClick={this.handleTeamSelection}
              />
            </Col>
            <Col xs={24} sm={16}>
              <SearchPool
                theme={theme}
                title={title}
                users={usersInTeam}
                onTagDoubleClick={this.handleUserSelection}
              />
            </Col>
          </Row>
        )}
        <Row className="mt-md">
          <Button
            className={`${theme}-theme-btn`}
            onClick={this.handleSaveClick}
          >
            <Icon size="small" type="save" />
            {formatMessage({ id: 'global.ui.button.save' })}
          </Button>
          <Button
            className="ml-sm"
            onClick={this.handleCancelClick}
          >
            <Icon size="small" type="close" />
            {formatMessage({ id: 'global.ui.button.cancel' })}
          </Button>
        </Row>
      </Panel>
    );
  }
}


ObjectShare.defaultProps = defaultProps;
ObjectShare.propTypes = propTypes;
const mapStateToProps = ({ global, objectShare }) => ({
  language: global.language,
  users: global.settings.users,
  flatTeams: global.settings.flatTeams,
  teams: global.settings.teams,
  sharedTeams: objectShare.sharedTeams,
  sharedUsers: objectShare.sharedUsers,
  title: objectShare.title,
  usersInTeam: objectShare.usersInTeam,
});
const mapDispatchToProps = {
  changeSelections,
  removeFromSelection,
  setActiveTeam,
  tryFetchShareTo,
  tryFetchAllTeamsIfNeeded,
  tryFetchAllUsersIfNeeded,
  updateSelection,
  tryUpdateShares,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ObjectShare)));
