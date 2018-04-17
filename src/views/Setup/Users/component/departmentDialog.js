/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';
import { DefaultDepartment } from 'components/ui/index';
import { getTreeItemByKey } from 'utils/treeUtil';

class DepartmentDialog extends React.Component {
    state={
      expandedKeys: null,
    }
    selectDepartment(isDefault, selectedKeys, treeData) {
      const { toggleDepartmentDialog, setDepartment } = this.props;
      const { id, name } = isDefault ? selectedKeys : getTreeItemByKey(treeData, selectedKeys[0]);
      toggleDepartmentDialog(false);
      setDepartment({
        department_id: id,
        department_name: name,
      });
    }
    onExpand(expandedKeys) {
      this.setState({ expandedKeys });
    }
    render() {
      const {
        isDisplayDepartmentDialog, teams, noDepartment, intl, teamIds,
      } = this.props;
      const { formatMessage } = intl;
      return (
        <Modal
          visible={isDisplayDepartmentDialog}
          title={formatMessage({ id: 'page.users.selectTeam' })}
          footer={[]}
          onCancel={() => this.props.toggleDepartmentDialog(false)}
        >
          {
              noDepartment ? '' : <DefaultDepartment onSelect={(id, name) => { this.selectDepartment(true, { id, name }); }} />
          }

          <TeamTree
            onSelect={(selectedKeys, treeData) => this.selectDepartment(false, selectedKeys, treeData)}
            teams={teams}
            expandedKeys={this.state.expandedKeys || teamIds}
            onExpand={expandedKeys => this.onExpand(expandedKeys)}
            defaultExpandAll
            autoExpandParent={false}
          />
        </Modal>
      );
    }
}
DepartmentDialog.defaultProps = {
  isDisplayDepartmentDialog: false,
  toggleDepartmentDialog: () => {},
  setDepartment: () => {},
  noDepartment: false,
};
DepartmentDialog.propTypes = {
  intl: intlShape.isRequired,
  isDisplayDepartmentDialog: PropTypes.bool,
  toggleDepartmentDialog: PropTypes.func,
  setDepartment: PropTypes.func,
  teams: PropTypes.array.isRequired,
  noDepartment: PropTypes.bool,
  teamIds: PropTypes.array.isRequired,
};

export default injectIntl(DepartmentDialog);
