/* eslint-disable no-shadow,react/prop-types */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Icon, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, FloatingLabelInput, SelectionPool, SearchPool } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import { FIELD_EDIT } from '../flow/pageAction';

import {
  setPickListValueManagement,
  toggleAdding,
  getVisibleTeamandUsers,
  getUnVisibleTeamandUsers,
  updateRestriciontToRemote,
  updatePickListValueStatusToRemote,
  fetchUserAll,
  setAddDepartment,
} from '../flow/action';
import { getTeamUser, getTeams } from '../flow/reselect';

class PickListOptionEditContainer extends React.Component {
  constructor(props) {
    super(props);
    if (_.isEmpty(`${props.manageList.valId}`)) {
      const { history, objectType } = props;
      history.push(`/setup/${objectType}/fields`);
    }
  }
  componentDidMount() {
    const { getUnVisibleTeamandUsers, manageList } = this.props;
    if (!_.isEmpty(`${manageList.valId}`)) {
      getUnVisibleTeamandUsers(manageList.valId);
    }
  }

  onSubmit() {
    const {
      updatePickListValueStatusToRemote, updateRestriciontToRemote, manageList, history, objectType,
    } = this.props;
    updateRestriciontToRemote(
      manageList.valId,
      manageList.unvisibleUsers.map(v => v.id),
      manageList.unvisibleTeams.map(v => v.id),
      () => {
        updatePickListValueStatusToRemote(manageList.valId, { option_value: manageList.valueText }, () => {
          history.push(`/setup/${objectType}/fields?&action=${FIELD_EDIT}`);
        });
      },
    );
  }
  onCancel() {
    const { history, objectType } = this.props;
    history.push(`/setup/${objectType}/fields?&action=${FIELD_EDIT}`);
  }
  removeItem(itemId, isTeam) {
    const { manageList, setPickListValueManagement } = this.props;
    const key = isTeam ? 'visibleTeams' : 'visibleUsers';
    const newArray = manageList[`un${key}`].filter(i => `${i.id}` !== `${itemId}`);
    const item = manageList[`un${key}`].filter(i => `${i.id}` === `${itemId}`)[0];
    let newVisibleArray = [...manageList[key]];
    if (_.isEmpty(_.find(manageList[key], { id: itemId }))) {
      newVisibleArray = [...manageList[key], item];
    }
    setPickListValueManagement({ [`un${key}`]: newArray, [key]: newVisibleArray });
  }
  addItem(itemId, isTeam) {
    const { manageList, setPickListValueManagement } = this.props;
    const key = isTeam ? 'visibleTeams' : 'visibleUsers';
    let newArray = manageList[`un${key}`].slice();
    const item = manageList[key].filter(i => `${i.id}` === `${itemId}`)[0];
    if (_.isEmpty(_.find(newArray, { id: itemId }))) {
      newArray = [...newArray, item];
    }
    setPickListValueManagement({ [`un${key}`]: newArray, [key]: manageList[key].filter(i => `${i.id}` !== `${itemId}`) });
  }


  addRestriction() {
    const {
      toggleAdding, fetchUserAll, getVisibleTeamandUsers, manageList,
    } = this.props;
    toggleAdding(true);
    fetchUserAll();
    getVisibleTeamandUsers(manageList.valId);
  }
  clickTeam(teamId) {
    const { setAddDepartment } = this.props;
    setAddDepartment({
      selectedTeamId: teamId,
    });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      objectType,
      manageList,
      setPickListValueManagement,
      ui,
      teamUser,
      visibleTeams,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];
    const permissionPrefix = `SETUP_${objectType.toUpperCase()}_FIELDS`;
    return (
      <Permission permission={PERMISSIONS[`${permissionPrefix}_UPDATE`]} errorComponent={<Unauthentication/>}>

        <Panel panelClasses={`${classType}-theme-panel`} panelTitle={formatMessage({ id: 'page.fields.updateExistingValue' })}>
          <div className="panel-section">
            <div className="section-content mb-lg">

              <FloatingLabelInput
                labelText=""
                value={manageList.valueText}
                handleChange={val => setPickListValueManagement({ valueText: val })}
              />

            </div>
            <div className="section-header">
              {formatMessage({ id: 'page.fields.restriction' })} <Icon type="plus-square-o" className={`${classType}-theme-icon`} style={{ float: 'right' }} onClick={() => { this.addRestriction(); }} />
            </div>
            <div className="section-content  mt-lg">
              <p>{formatMessage({ id: 'page.fields.restrictionInfo' })}</p>
              <SelectionPool
                theme={classType}
                users={manageList.unvisibleUsers}
                teams={manageList.unvisibleTeams}
                onTagClose={(itemId, isTeam) => this.removeItem(itemId, isTeam)}
                closable
                withIcon
              />
              {
                  ui.isShowAdding ?
                    <Row className="pt-lg" gutter={16}>
                      <Col span={12}>
                        <SearchPool
                          theme={classType}
                          title="department"
                          teams={visibleTeams}
                          onTagClick={itemid => this.clickTeam(itemid)}
                          onTagDoubleClick={itemid => this.addItem(itemid, true)}
                        />
                        <p>{formatMessage({ id: 'page.fields.doubleClickDepart' })}</p>
                      </Col>
                      <Col span={12}>
                        <SearchPool
                          theme={classType}
                          title="users"
                          users={teamUser}
                          onTagDoubleClick={itemid => this.addItem(itemid, false)}
                        />
                        <p>{formatMessage({ id: 'page.fields.doubleClickUser' })}</p>
                      </Col>
                    </Row>
                      : ''
              }
              <div className="pt-lg">
                <Button type="primary" size="small" className="mr-lg " onClick={() => { this.onCancel(); }}><Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>
                <Button size="small" className={`${classType}-theme-btn`} htmlType="submit" onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
              </div>
            </div>
          </div>
        </Panel>
      </Permission>

    );
  }
}
PickListOptionEditContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup }) => {
  const {
    manageList,
    ui,
  } = setup.fields.picklist;
  return {
    objectType: setup.fields.addField.addedField.objType,
    manageList,
    ui,
    teamUser: getTeamUser(setup),
    visibleTeams: getTeams(setup),
  };
};
const mapDispatchToProps = {
  setPickListValueManagement,
  toggleAdding,
  getVisibleTeamandUsers,
  getUnVisibleTeamandUsers,
  updateRestriciontToRemote,
  updatePickListValueStatusToRemote,
  fetchUserAll,
  setAddDepartment,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(PickListOptionEditContainer)));

