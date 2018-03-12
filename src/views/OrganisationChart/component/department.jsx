/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import { TeamTree } from 'components/page/index';


class Department extends React.Component {
  delete(id) {
    console.log(id, 'delete');
  }
  add(parentId) {
    console.log(parentId, 'add');
  }
  modifyTeamName(newTeamName, id) {
    console.log(newTeamName, id, 'modify');
  }
  render() {
    return (

      <TeamTree
        onSelect={(selectedKeys, treeData) => this.selectDepartment(selectedKeys, treeData)}
        canAdd
        canDelete
        modifyTeamName={(newTeamName, id) => this.modifyTeamName(newTeamName, id)}
        draggable
        onDelete={id => this.delete(id)}
        onAdd={parentId => this.add(parentId)}
      />

    );
  }
}
Department.defaultProps = {

};
Department.propTypes = {

};

export default Department;
