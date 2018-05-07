/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  ClientAttachments,
  CompanyInfo,
  ConvertLeads,
  Dashboard,
  EditCampaign,
  EmailCampaign,
  EmailTemplates,
  EmailTemplatesCreation,
  Fields,
  FindDuplicates,
  Layouts,
  MergeLeads,
  MySetting,
  NewCampaign,
  NewEmail,
  ObjectList,
  ObjectView,
  ObjectTask,
  OrganisationChart,
  PermissionProfile,
  UIDemo,
  Users,
  GlobalSearch,
  ObjectShare,
    Task,
  ClientDetails,
} from 'views/index';
import Enums from 'utils/EnumsManager';

const { ObjectTypes, PhantomId } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

const MainContent = () => (
  <Switch>
    <Route path="/setup/company-info/ui-demo" component={UIDemo} />
    <Route path="/setup/company-info/company-info" component={CompanyInfo} />
    <Route path="/setup/company-info/users" component={Users} />
    <Route path="/setup/company-info/chart" component={OrganisationChart} />
    <Route path="/setup/company-info/permissions" component={PermissionProfile} />
    <Route path="/setup/:objectType/fields" component={Fields} />
    <Route path="/setup/:objectType/pageLayout" component={Layouts} />
    <Route path="/setup/email/templates" component={EmailTemplates} />
    <Route
      path="/setup/email/template-edit/:templateId"
      component={EmailTemplatesCreation}
    />
    <Route
      path="/setup/email/templates-creation"
      component={EmailTemplatesCreation}
    />
    <Route path="/:objectType/:objectId/email/new" component={NewEmail} />
    <Route path="/setup/email/campaign" component={EmailCampaign} exact />
    <Route path="/setup/email/campaign/edit/:campaignId" component={EditCampaign} />
    <Route path="/setup/email/campaign/new" component={NewCampaign} />

    <Route path="/my-setting" component={MySetting} />
    <Route path="/:objectType/:objectId/email/new" component={NewEmail} />
    <Route path="/user/email-setting" component={EmailTemplates} />
    <Route path="/dashboard" component={Dashboard} exact />
    <Route path="/globalSearch" component={GlobalSearch} exat />
    <Route path="/Task" component={Task} />

    <Route path="/leads/convert/find/:objectId" component={FindDuplicates} />
    <Route path="/leads/merge/" component={MergeLeads} />

    <Route
      path="/leads/convert/convert/:objectId"
      render={(props) => {
        const { match } = props;
        const { objectId } = match.params;
        return (
          <ConvertLeads
            {...props}
            objectId={objectId}
          />
        );
      }}
    />
    <Route
      path="/accounts/:accountId/opportunities/0000-0000"
      render={(props) => {
        const { match } = props;
        const { accountId } = match.params;
        return (
          <ClientDetails
            {...props}
            key={`${Opportunities}_${PhantomId}`}
            accountId={accountId}
            objectId={PhantomId}
            objectType={Opportunities}
          />
        );
      }}
    />
    <Route path="/:objectType/find/:objectId" component={FindDuplicates} />
    <Route
      path="/:objectType/sharing/:objectId"
      render={(props) => {
        const { match } = props;
        const { objectId, objectType } = match.params;
        if ([Leads, Accounts].indexOf(objectType) !== -1) {
          return (
            <ObjectShare
              {...props}
              objectId={objectId}
              objectType={objectType}
            />
          );
        }
        // TOOD: return 404 page
        return null;
      }}
    />
    <Route path="/:objectType/:objectId/attachments" component={ClientAttachments} exact />
    <Route
      path="/:objectType/:objectId/tasks/:taskId/completed"
      render={(props) => {
        return (
          <ObjectTask
            {...props}
            defaultStateId={1}
          />
        );
      }}
    />
    <Route path="/:objectType/:objectId/tasks/:taskId" component={ObjectTask} />
    <Route path="/:objectType/views/:viewId" component={ObjectView} />
    <Route
      path="/:objectType/:objectId"
      exact
      render={(props) => {
        const { match } = props;
        const { objectId, objectType } = match.params;
        if ([Leads, Accounts, Opportunities].indexOf(objectType) !== -1) {
          return (
            <ClientDetails
              {...props}
              key={`${objectType}_${objectId}`}
              objectId={objectId}
              objectType={objectType}
            />
          );
        }
        // TOOD: return 404 page
        return null;
      }}
    />
    <Route
      path="/:objectType"
      exact
      render={(props) => {
        const { match } = props;
        const { objectType } = match.params;
        if ([Leads, Accounts, Opportunities].indexOf(objectType) !== -1) {
          return <ObjectList key={objectType} {...props} objectType={objectType} />;
        }
        // TOOD: return 404 page
        return null;
      }}
    />
  </Switch>
);


export default MainContent;
