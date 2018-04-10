import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Table, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { FloatingLabelInput, StyledModal } from 'components/ui/index';


const defaultProps = {
  data: [],
  selectedId: 2,  // test
  visible: false,
};
const propTypes = {
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  selectedId: PropTypes.number,
  visible: PropTypes.bool.isRequired,
};


class AssigneeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  _onCancel = $ => {
    this.setState({ searchText: '' });
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  }
  
  handleFilterChange = value => this.setState({ searchText: value })

  addHighlightCls = record => {
    const { selectedId } = this.props;
    if (record.id === selectedId) {
      return `cursor-pointer ${cx('selected')}`;
    }
    return 'cursor-pointer';
  }

  _onRowClick = e => {
    const { onRowClick } = this.props;
    if (_.isFunction(onRowClick)) {
      const { id, name } = e.currentTarget.dataset;
      onRowClick(id, name);
    }
  }

  renderColumns = formatMessage => {
    const i18nPrefix = 'global.ui.table';
    return [
      {
        dataIndex: 'fullName',
        title: formatMessage({ id: `${i18nPrefix}.fullName` }),
      },
      {
        dataIndex: 'team',
        title: formatMessage({ id: `${i18nPrefix}.team` }),
      },
      {
        dataIndex: 'workHour',
        title: formatMessage({ id: `${i18nPrefix}.workHour` }),
      },
    ];
  }

  render() {
    const { searchText } = this.state;
    const { intl, data, selectedId, visible } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.assigneeModal';

    const columns = this.renderColumns(formatMessage);
    const filteredData = data.filter(record => record.fullName.indexOf(searchText) !== -1
                                                || record.team.indexOf(searchText) !== -1);

    return (
      <StyledModal
        footer={null}
        onCancel={this._onCancel}
        title={formatMessage({ id: `${i18nPrefix}.title`})}
        visible={visible}
      >
        <FloatingLabelInput
          labelText="Search"
          labelColor="#000"
          handleChange={this.handleFilterChange}
          placeholder="Filter in table by Name/Team"
          addonAfter={<Icon size="small" type="search" />}
          value={searchText}
        />
        <div className={cx('hint')}>
          {formatMessage({ id: `${i18nPrefix}.hint` })}
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={record => ({
            'data-id': record.id,
            'data-name': record.fullName,
            onClick: this._onRowClick,
          })}
          pagination={false}
          rowClassName={this.addHighlightCls}
          rowKey="id"
        />
      </StyledModal>
    );
  }
}


AssigneeModal.defaultProps = defaultProps;
AssigneeModal.propTypes = propTypes;
export default injectIntl(AssigneeModal);