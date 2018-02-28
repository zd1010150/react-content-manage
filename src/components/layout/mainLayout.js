import React from 'react';
import { 
  TopPanel,
  HeaderNav,
  MainContent,
  CopyRight,
  Notification,
  SetupSider,
} from '../page/index';

import { 
  Leads,
} from 'views/index';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

const MainLayout = ({ location }) => (
  <Layout>
    <TopPanel />
    <Layout>
      {location.pathname.indexOf('setup') !== -1
          ? <SetupSider/>
          : null}
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Switch>
            <Route exact path="/leads" component={Leads} />
            {/* <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/opportunities" component={Opportunities} />
            <Route exact path="/reports" component={Reports} /> */}
          </Switch>
        </Content>
        <Footer><CopyRight /></Footer>
      </Layout>
    </Layout>
  </Layout>
);

export default withRouter(MainLayout);
