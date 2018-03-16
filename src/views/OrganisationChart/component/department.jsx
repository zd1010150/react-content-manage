/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';
import { DeleteConfirmDialog } from 'components/ui/index';
import { getTreeItemByKey } from 'utils/treeUtil';

class Department extends React.Component {
  state={
    deleteDialogVisible: false,
    deleteId: '',
  }
  confirmDelete() {
    const { deleteDepartment } = this.props;
    deleteDepartment(this.state.deleteId);
    this.setState({
      deleteDialogVisible: false,
    });
  }
  delete = (id) => {
    this.setState({
      deleteDialogVisible: true,
      deleteId: id,
    });
  }
  add = (parentId) => {
    const { teams, setSelectedTeam, setAddVisible } = this.props;
    const { id, name } = getTreeItemByKey(teams, parentId);
    setSelectedTeam(id, name);
    setAddVisible(true);
  }
  modifyTeamName = (newTeamName, id) => {
    this.props.updateTeam(id, newTeamName);
  }
  selectDepartment = (selectedKeys) => {
    const { id, name } = getTreeItemByKey(this.props.teams, selectedKeys[0]);
    this.props.setSelectedTeam(id, name);
  }
  render() {
    const { teams, setTeams } = this.props;
    return (
      <div>
        <TeamTree
          onSelect={selectedKeys => this.selectDepartment(selectedKeys)}
          canAdd
          canDelete
          canModifyTeamName
          modifyTeamName={(newTeamName, id) => this.modifyTeamName(newTeamName, id)}
          onDelete={id => this.delete(id)}
          onAdd={parentId => this.add(parentId)}
          teams={teams}
          setTeams={setTeams}
          defaultExpandAll
        />
        <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} />
      </div>


    );
  }
}
Department.defaultProps = {

};
Department.propTypes = {
  intl: intlShape.isRequired,
  teams: PropTypes.array.isRequired,
  setTeams: PropTypes.func.isRequired,
  setSelectedTeam: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  setAddVisible: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
};

export default injectIntl(Department);
