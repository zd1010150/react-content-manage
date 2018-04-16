/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';
import { DeleteConfirmDialog, DefaultDepartment } from 'components/ui/index';


class Department extends React.Component {
  state={
    deleteDialogVisible: false,
    deleteId: '',
    expandedKeys: null,
  }
  confirmDelete() {
    const { deleteDepartment } = this.props;
    deleteDepartment(this.state.deleteId);
    this.setState({
      deleteDialogVisible: false,
    });
  }
  onExpand(expandedKeys) {
    this.setState({ expandedKeys });
  }
  delete = (id) => {
    this.setState({
      deleteDialogVisible: true,
      deleteId: id,
    });
  }
  add = (parentId) => {
    const { setSelectedTeam, setAddVisible } = this.props;
    setSelectedTeam(parentId);
    setAddVisible(true);
  }
  modifyTeamName = (newTeamName, id) => {
    this.props.updateTeam(id, newTeamName);
  }
  selectDepartment = (selectedKeys) => {
    this.props.setSelectedTeam(selectedKeys[0]);
  }
  render() {
    const {
      teams, setTeams, setSelectedTeam, teamIds, intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        <DefaultDepartment onSelect={(id) => { setSelectedTeam(id); }} />
        <TeamTree
          onSelect={selectedKeys => this.selectDepartment(selectedKeys)}
          canAdd
          canDelete
          canModifyTeamName
          modifyTeamName={(newTeamName, id) => this.modifyTeamName(newTeamName, id)}
          onExpand={expandedKeys => this.onExpand(expandedKeys)}
          onDelete={id => this.delete(id)}
          onAdd={parentId => this.add(parentId)}
          teams={teams}
          setTeams={setTeams}
          expandedKeys={this.state.expandedKeys || teamIds}
          defaultExpandAll
          autoExpandParent={false}
        />
        <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} >
          <h3>{ formatMessage({ id: 'global.ui.dialog.deleteTitle' })}</h3>
        </DeleteConfirmDialog>
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
  teamIds: PropTypes.array.isRequired,
};

export default injectIntl(Department);
