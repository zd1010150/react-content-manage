/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';
import { DefaultDepartment } from 'components/ui/index';
import { getTreeItemByKey } from 'utils/treeUtil';

class DepartmentDialog extends React.Component {
  selectDepartment(isDefault, selectedKeys, treeData) {
    const { toggleDepartmentDialog, setDepartment } = this.props;
    const { id, name } = isDefault ? selectedKeys : getTreeItemByKey(treeData, selectedKeys[0]);
    toggleDepartmentDialog(false);
    setDepartment({
      department_id: id,
      department_name: name,
    });
  }
  render() {
    const { isDisplayDepartmentDialog, teams } = this.props;
    return (
      <Modal
        visible={isDisplayDepartmentDialog}
        title="Title"
        footer={[]}
        onCancel={() => this.props.toggleDepartmentDialog(false)}
      >
        <DefaultDepartment onSelect={(id, name) => { this.selectDepartment(true, { id, name }); }} />
        <TeamTree onSelect={(selectedKeys, treeData) => this.selectDepartment(false, selectedKeys, treeData)} teams={teams} defaultExpandAll />
      </Modal>
    );
  }
}
DepartmentDialog.defaultProps = {
  isDisplayDepartmentDialog: false,
  toggleDepartmentDialog: () => {},
  setDepartment: () => {},
};
DepartmentDialog.propTypes = {
  intl: intlShape.isRequired,
  isDisplayDepartmentDialog: PropTypes.bool,
  toggleDepartmentDialog: PropTypes.func,
  setDepartment: PropTypes.func,
  teams: PropTypes.array,
};

export default injectIntl(DepartmentDialog);
