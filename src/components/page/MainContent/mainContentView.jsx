/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Dashboard,
  Leads,
  UIDemo,
  CompanyInfo,
  Users,
  OrganisationChart,
  EmailTemplates,
  EmailTemplatesCreation,
  NewEmail,
  EmailCampaign,
  EditCampaign,
  NewCampaign,
  PermissionProfile,
  Fields,
  ObjectDetails,
  FindDuplicates,
  Layouts,
  ObjectTask,
  ClientAttachments,
  MergeLeads,
  MySetting,
  ConvertLeads,
} from 'views/index';


import { ObjectFilter } from '../index';

const MainContent = () =>
  (<Switch>
    <Route path="/setup/company-info/ui-demo" component={UIDemo} />
    <Route path="/setup/company-info/company-info" component={CompanyInfo} />
    <Route path="/setup/company-info/users" component={Users} />
    <Route path="/setup/company-info/chart" component={OrganisationChart} />
    <Route path="/user/email-setting" component={EmailTemplates} />
    <Route path="/setup/email/templates" component={EmailTemplates} />
    <Route
      path="/setup/email/template-edit/:templateId"
      component={EmailTemplatesCreation}
    />
    <Route
      path="/setup/email/templates-creation"
      component={EmailTemplatesCreation}
    />
    <Route path="/email/new" component={NewEmail} />
    <Route path="/setup/email/campaign" component={EmailCampaign} exact />
    <Route
      path="/setup/email/campaign/edit/:campaignId"
      component={EditCampaign}
    />
    <Route path="/setup/email/campaign/new" component={NewCampaign} />
    <Route
      path="/setup/company-info/permissions"
      component={PermissionProfile}
    />
    <Route path="/setup/:objectType/fields" component={Fields} />
    <Route path="/setup/:objectType/pageLayout" component={Layouts} />
    <Route path="/my-setting" component={MySetting} />
    <Route path="/:objectType/views/:viewId" component={ObjectFilter} />
    <Route path="/:objectType/sharing/:objectId" component={FindDuplicates} />
    <Route path="/:objectType/find/:objectId" component={FindDuplicates} />
    <Route path="/leads/convert/find/:objectId" component={FindDuplicates} />
    <Route path="/leads/convert/convert/:objectId" component={ConvertLeads} />
    <Route path="/leads/merge/" component={MergeLeads} />
    <Route path="/:objectType/tasks/:objectId" component={ObjectTask} />
    <Route path="/:objectType/attachments/:objectId" component={ClientAttachments} />
    <Route path="/:objectType/:objectId" component={ObjectDetails} exact />
    <Route path="/leads" component={Leads} exact />
    <Route path="/accounts" component={Leads} exact />
    <Route path="/opportunities" component={Leads} exact />
    <Route path="/dashboard" component={Dashboard} exact />
  </Switch>);

export default MainContent;
