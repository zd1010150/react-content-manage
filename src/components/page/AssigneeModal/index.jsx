import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Table, Icon } from 'antd';

import { FloatingLabelInput, StyledModal } from 'components/ui/index';
//
const columns = [
  {
    dataIndex: 'fullName',
    
  },
];


const defaultProps = {
  data: [],
  visible: false,
};
const propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.number,
  visible: PropTypes.bool.isRequired,
};


class AssigneeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  _onCancel = $ => this.setState({ visible: false })

  _onFilterChange = value => this.setState({ searchText: value })

  renderColumns = formatMessage => {

  }

  render() {
    const { intl, data, value, visible } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.assigneeModal';

    return (
      <StyledModal
        title={formatMessage({ id: `${i18nPrefix}.`})}
        visible={visible}
        onCancel={this._onCancel}
      >
        <FloatingLabelInput
          labelText="Search"
          onChange={this._onFilterChange}
          placeholder="Filter by Name/Role/Team"
          addonAfter={<Icon size="small" type="search" />}
        />
        <div>{formatMessage({ id: `${i18nPrefix}.hint` })}</div>
        <Table
          columns={[]}
          dataSource={[]}
          rowKey="id"
        />
      </StyledModal>
    );
  }
}


AssigneeModal.defaultProps = defaultProps;
AssigneeModal.propTypes = propTypes;
export default injectIntl(AssigneeModal);