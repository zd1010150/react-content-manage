/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Icon, Card, notification} from 'antd';
import {intlShape, injectIntl} from 'react-intl';
import {TeamTree} from 'components/page/index';
import {DefaultDepartment} from 'components/ui/index';

class User extends React.Component {
    selectUser(user) {
        const {getUserFolderData, setSelectedUser} = this.props;
        getUserFolderData(user.id);
        setSelectedUser(user);
    }

    // selectDepartment(teamId) {
    //   const {
    //     updateUsers, getAllUser, selectedUser, intl,
    //   } = this.props;
    //   if (Number(teamId) === Number(selectedUser.team_id)) {
    //     notification.error({
    //       message: intl.formatMessage({ id: 'page.organChart.chooseSameDeparment' }),
    //       duration: 3,
    //     });
    //     return;
    //   }
    //   updateUsers({ id: selectedUser.id, team_id: teamId }, () => {
    //     getAllUser();
    //   });
    // }

    render() {
        const {
            intl,
            selectedUser,
            teamUsers,
            teams,
            selectedTeamName
        } = this.props;
        const {formatMessage} = intl;
        return (
            <div >
                <Card title={selectedTeamName} bordered={false} style={{width: '100%'}}
                      bodyStyle={{minHeight: '150px'}}>
                    {
                        teamUsers.map(user => <Button key={user.id} className="ml-sm btn-ellipse "
                                                      onClick={() => this.selectUser(user)}>{user.name}<Icon
                            type="swap"/></Button>)
                    }
                </Card>
            </div>

        );
    }
}
User.defaultProps = {};
User.propTypes = {
    intl: intlShape.isRequired,
    selectedTeamName: PropTypes.string.isRequired,
    teamUsers: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
    selectedUser: PropTypes.object.isRequired,
    getUserFolderData: PropTypes.func.isRequired,
    getAllUser: PropTypes.func.isRequired,
    updateUsers: PropTypes.func.isRequired,
};

export default injectIntl(User);

