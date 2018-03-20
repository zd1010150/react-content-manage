/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Card, notification } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';
import { DefaultDepartment } from 'components/ui/index';

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
    if (Number(teamId) === Number(selectedUser.team_id)) {
      notification.error({
        message: intl.formatMessage({ id: 'page.organChart.chooseSameDeparment' }),
        duration: 3,
      });
      return;
    }
    updateUsers({ id: selectedUser.id, team_id: teamId }, () => {
      getAllUser();
      setSeleteTeamDialogVisible(false);
    });
  }

  render() {
    const {
      intl,
      isSelectTeamDialogVisible,
      setSeleteTeamDialogVisible,
      selectedUser,
      teamUsers,
      teams,
      selectedTeamName,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div >
        <Card title={selectedTeamName} bordered={false} style={{ width: '100%' }} bodyStyle={{ minHeight: '150px' }}>
          {
                    teamUsers.map(user => <Button key={user.id} className="ml-sm btn-ellipse " onClick={() => this.selectUser(user)}>{user.name}<Icon type="swap" /></Button>)
                }
        </Card>
        <Modal onCancel={() => setSeleteTeamDialogVisible(false)} footer={[]} title={formatMessage({ id: 'page.organChart.chooseDepartment' })} visible={isSelectTeamDialogVisible}>
          <h3>{formatMessage({ id: 'page.organChart.chooseDepartmentSubTitle' }, { user: selectedUser.name, department: selectedTeamName })}</h3>
          <p> {formatMessage({ id: 'page.organChart.chooseDepartmentTip' })}</p>
          <DefaultDepartment onSelect={teamId => this.selectDepartment(teamId)} />
          <TeamTree teams={teams} onSelect={teamId => this.selectDepartment(teamId && teamId[0])} />
        </Modal>
      </div>

    );
  }
}
User.defaultProps = {

};
User.propTypes = {
  intl: intlShape.isRequired,
  selectedTeamName: PropTypes.string.isRequired,
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

