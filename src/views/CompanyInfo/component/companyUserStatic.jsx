/* eslint-disable no-shadow */
import React from 'react';
import { Table, Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';


class companyUserStatic extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const rightActions = (() => {
      const actions = [];
      actions.push(<Button key="addBtn" className="btn-ellipse ml-sm" size="small" icon="user-add" onClick={() => window.location = './setup/users?action=add'}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}</Button>);
      actions.push(<Button key="viewAll" className="btn-ellipse ml-sm" size="small" icon="eye" onClick={() => window.location = './setup/users?action=view'}>{ formatMessage({ id: 'global.ui.button.view' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}</Button>);
      return actions;
    })();
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return (
      <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions}>
        <Table dataSource={dataSource} columns={columns} pagination={false} rowSelection={{}} />
      </Panel>
    );
  }
}
companyUserStatic.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(companyUserStatic);
