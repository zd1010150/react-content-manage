import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, List } from 'antd';
import { Panel } from 'components/ui/index';

class LeftSection extends React.Component {
  render() {
    const {
      leads, accounts, objects, intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        <Row>
          <Col className="gutter-row mr-md" span={7} >
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newLeads' })}>
              <div className="pl-lg pt-md pb-md">
                <List
                  size="small"
                  dataSource={leads}
                  renderItem={l => (<List.Item><Link className={`${objTypeAndClassTypeMap.leads}-theme-text`} to={`leads/${l.id}`}>{l.name}</Link></List.Item>)}
                />
              </div>
            </Panel>
          </Col>
          <Col className="gutter-row mr-md" span={7}>
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newAccounts' })} >
              <List
                size="small"
                dataSource={accounts}
                renderItem={l => (<List.Item><Link className={`${objTypeAndClassTypeMap.accounts}-theme-text`} to={`accounts/${l.id}`}>{l.name}</Link></List.Item>)}
              />
            </Panel>
          </Col>
          <Col className="gutter-row" span={7}>
            <Panel panelTitle={formatMessage({ id: 'page.dashboard.newObjects' })} >
              <List
                size="small"
                dataSource={objects}
                renderItem={l => (<List.Item><Link className={`${objTypeAndClassTypeMap[l.object_type]}-theme-text`} to={`${l.object_type}/${l.id}`}>{l.name}</Link></List.Item>)}
              />
            </Panel>
          </Col>
        </Row>

        <div />
      </div>
    );
  }
}
LeftSection.propTypes = {
  intl: intlShape.isRequired,
  leads: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  objects: PropTypes.array.isRequired,
};
export default injectIntl(LeftSection);
