/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';


import {
  Leads,
  DDDemo,
  DragPreview,
  UIDemo,
  CompanyInfo,
  Users,
  OrganisationChart,
  EmailTemplates,
  EmailTemplatesCreation
} from 'views/index';

import { ObjectFilter } from '../index';

const MainContent = () => (
  <Switch>
    <Route path="/:object/views/:viewId" component={ObjectFilter} />
    <Route path="/leads" component={Leads} />
    <Route path="/setup/company-info/dd-demo" component={DDDemo} />
    <Route path="/setup/company-info/drag-preveiw" component={DragPreview} />
    <Route path="/setup/company-info/ui-demo" component={UIDemo} />
    <Route path="/setup/company-info/company-info" component={CompanyInfo} />
    <Route path="/setup/company-info/users" component={Users} />
    <Route path="/setup/company-info/chart" component={OrganisationChart} />
    <Route path="/setup/email/templates/" component={EmailTemplates} />
    <Route path="/setup/email/templates-creation/" component={EmailTemplatesCreation} />
  </Switch>
);
export default MainContent;
