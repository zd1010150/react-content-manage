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
  }
  selectDepartment = (selectedKeys) => {
    this.props.setSelectedTeam(selectedKeys[0]);
  }
  render() {
    const { teams, setTeams, setSelectedTeam } = this.props;
    return (
      <div>
        <DefaultDepartment onSelect={(id) => { setSelectedTeam(id); }} />
        <TeamTree
          onSelect={selectedKeys => this.selectDepartment(selectedKeys)}
          teams={teams}
          setTeams={setTeams}
          defaultExpandAll
        />
        {/*<DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} >*/}
          {/*<h3>一旦删除，就都无法恢复</h3>*/}
        {/*</DeleteConfirmDialog>*/}
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
  updateTeam: PropTypes.func.isRequired,
};

export default injectIntl(Department);
