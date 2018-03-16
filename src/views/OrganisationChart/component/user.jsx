/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Card, notification } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';

class User extends React.Component {
  selectUser(user) {
    const { setSelectedUser, setSeleteTeamDialogVisible } = this.props;
    setSelectedUser(user);
    setSeleteTeamDialogVisible(true);
  }
  selectDepartment(teamId) {
    const {
      updateUsers, getAllUser, selectedUser, setSeleteTeamDialogVisible, intl,
    } = this.props;
    if (Number(teamId[0]) === Number(selectedUser.team_id)) {
      notification.error({
        message: intl.formatMessage({ id: 'page.organChart.chooseSameDeparment' }),
        duration: 3,
      });
      return;
    }
    updateUsers({ id: selectedUser.id, team_id: teamId[0] }, () => {
      getAllUser();
      setSeleteTeamDialogVisible(false);
    });
  }

  render() {
    const {
      intl,
      isSelectTeamDialogVisible,
      setSeleteTeamDialogVisible,
      selectedDepartment,
      selectedUser,
      teamUsers,
      teams,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div >
        <Card title={selectedDepartment.name} bordered={false} style={{ width: '100%' }} bodyStyle={{ minHeight: '150px' }}>
          {
                    teamUsers.map(user => <Button key={user.id} className="ml-sm btn-ellipse " onClick={() => this.selectUser(user)}>{user.name}<Icon type="swap" /></Button>)
                }
        </Card>
        <Modal onCancel={() => setSeleteTeamDialogVisible(false)} footer={[]} title={formatMessage({ id: 'page.organChart.chooseDepartment' })} visible={isSelectTeamDialogVisible}>
          <h3>{formatMessage({ id: 'page.organChart.chooseDepartmentSubTitle' }, { user: selectedUser.name, department: selectedDepartment.name })}</h3>
          <p> {formatMessage({ id: 'page.organChart.chooseDepartmentTip' })}</p>
          <TeamTree teams={teams} onSelect={teamId => this.selectDepartment(teamId)} />
        </Modal>
      </div>

    );
  }
}
User.defaultProps = {

};
User.propTypes = {
  intl: intlShape.isRequired,
  selectedDepartment: PropTypes.object.isRequired,
  teamUsers: PropTypes.array.isRequired,
  isSelectTeamDialogVisible: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
  setSeleteTeamDialogVisible: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  getAllUser: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default injectIntl(User);

