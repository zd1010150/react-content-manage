/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { TeamTree } from 'components/page/index';

import { getTreeItemByKey } from 'utils/treeUtil';

class DepartmentDialog extends React.Component {
  selectDepartment(selectedKeys, treeData) {
    const { toggleDepartmentDialog, setDepartment } = this.props;
    const { key, title } = getTreeItemByKey(treeData, selectedKeys[0]);
    toggleDepartmentDialog(false);
    setDepartment({
      department_id: key,
      department_name: title,
    });
  }
  render() {
    const { isDisplayDepartmentDialog } = this.props;
    return (
      <Modal
        visible={isDisplayDepartmentDialog}
        title="Title"
        footer={[]}
      >
        <TeamTree onSelect={(selectedKeys, treeData) => this.selectDepartment(selectedKeys, treeData) } />
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
};

export default injectIntl(DepartmentDialog);
