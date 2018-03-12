/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import { TeamTree } from 'components/page/index';


class Department extends React.Component {
  delete = (id) => {
    console.log(id, 'delete');
  }
  add = (parentId) => {
    console.log(parentId, 'add');
  }
  modifyTeamName = (newTeamName, id) => {
    console.log(newTeamName, id, 'modify');
  }
  selectDepartment = (selectedKeys, treeData) => {
    console.log(selectedKeys, treeData);
  }
  render() {
    const { teams, setTeams } = this.props;
    return (

      <TeamTree
        onSelect={(selectedKeys, treeData) => this.selectDepartment(selectedKeys, treeData)}
        canAdd
        canDelete
        canModifyTeamName
        modifyTeamName={(newTeamName, id) => this.modifyTeamName(newTeamName, id)}
        draggable
        onDelete={id => this.delete(id)}
        onAdd={parentId => this.add(parentId)}
        teams={teams}
        setTeams={setTeams}
      />

    );
  }
}
Department.defaultProps = {

};
Department.propTypes = {
  teams: PropTypes.array.isRequired,
  setTeams: PropTypes.func.isRequired,
};

export default Department;
