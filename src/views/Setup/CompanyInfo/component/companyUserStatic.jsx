/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { PAGE_ACTION } from 'config/app.config';

class companyUserStatic extends React.Component {
  render() {
    const { userInfo, history } = this.props;
    const { formatMessage } = this.props.intl;
    const rightActions = (() => {
      const actions = [];
      actions.push(<Button key="addBtn" className="btn-ellipse ml-sm" size="small" icon="user-add" onClick={() => history.push(`/setup/company-info/users?action=${PAGE_ACTION.ADD}`)}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}</Button>);
      actions.push(<Button key="viewAll" className="btn-ellipse ml-sm" size="small" icon="eye" onClick={() => history.push(`/setup/company-info/users?action=${PAGE_ACTION.VIEWALL}`)}>{ formatMessage({ id: 'global.ui.button.view' }, { actionType: formatMessage({ id: 'global.properNouns.users' }) })}</Button>);
      return actions;
    })();
    const dataSource = [Object.assign({}, userInfo, { key: 1 })];
    const columns = [{
      title: formatMessage({ id: 'page.comInfo.totalUser' }),
      dataIndex: 'total',
      key: 'total',
    }, {
      title: formatMessage({ id: 'page.comInfo.activeUser' }),
      dataIndex: 'activeCount',
      key: 'activeCount',
    }, {
      title: formatMessage({ id: 'page.comInfo.inactiveUser' }),
      dataIndex: 'inactiveCount',
      key: 'inactiveCount',
    }];
    return (
      <Panel panelTitle={formatMessage({ id: 'global.properNouns.users' })} actionsRight={rightActions}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Panel>
    );
  }
}
companyUserStatic.propTypes = {
  intl: intlShape.isRequired,
  userInfo: PropTypes.object,
  history: PropTypes.object,
};

export default injectIntl(companyUserStatic);
