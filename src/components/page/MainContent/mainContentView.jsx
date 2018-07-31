/* eslint-disable react/no-typos */
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Permission, Unauthentication } from "components/page/index";
import PERMISSIONS from "config/app-permission.config";
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
  Exceptions,
  Conversion,
  Invoice,
} from 'views/index';

const { NotFound } = Exceptions;
import Enums from "utils/EnumsManager";

const { ObjectTypes, PhantomId } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

class MainContent extends React.Component {
  componentDidMount() {
    const { history, location } = this.props;
    if (location.pathname === "/") {
      history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    // TESTING
    // TODO: config to easy dev for specific page
    // debugger;
    console.log(process.env);
    const { history, location } = this.props;
    if (location.pathname !== '/leads/3409/invoice/1') {
      history.push("/leads/3409/invoice/1");
    }    
  }
  render() {
    return (
      <Switch>
        <Route path="/setup/company-info/ui-demo" component={UIDemo} />
        <Route
          path="/setup/company-info/company-info"
          component={CompanyInfo}
        />
        <Route path="/setup/company-info/users" component={Users} />
        <Route path="/setup/company-info/chart" component={OrganisationChart} />
        <Route
          path="/setup/company-info/permissions"
          component={PermissionProfile}
        />
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
        <Route path="/setup/email/campaign" component={EmailCampaign} exact />
        <Route
          path="/setup/email/campaign/edit/:campaignId"
          component={EditCampaign}
        />
        <Route path="/setup/email/campaign/new" component={NewCampaign} />
        <Route path="/my-setting" component={MySetting} />
        <Route path="/:objectType/:objectId/email/new" component={NewEmail} />
        <Route path="/user/email-setting" component={EmailTemplates} exact />
        <Route
          path="/user/email-setting/template-edit/:templateId"
          component={EmailTemplatesCreation}
        />
        <Route
          path="/user/email-setting/templates-creation"
          component={EmailTemplatesCreation}
        />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/globalSearch" component={GlobalSearch} exact />
        <Route path="/Task" component={Task} exact />
        <Route path="/leads/merge/" component={MergeLeads} />

        <Route
          path="/leads/convert/convert/:objectId"
          render={(props) => {
            const { match } = props;
            const { objectId } = match.params;
            return (
              <Conversion
                {...props}
                objectId={objectId}
              />
            );
          }}
        />
        <Route
          path="/accounts/:accountId/opportunities/:objectId"
          render={props => {
            const { match } = props;
            const { accountId, objectId } = match.params;
            return (
              <ClientDetails
                {...props}
                key={`${Opportunities}_${objectId}`}
                accountId={accountId}
                objectId={objectId}
                objectType={Opportunities}
              />
            );
          }}
        />
        <Route
          path="/leads/convert/find/:objectId"
          component={FindDuplicates}
        />
        <Route path="/leads/find/:objectId" component={FindDuplicates} />
        <Route
          path="/:objectType/sharing/:objectId"
          render={props => {
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
        <Route
          path="/:objectType/:objectId/invoice/:invoiceId"
          component={Invoice}
          exact
        />
        <Route
          path="/:objectType/:objectId/attachments/:attachmentId"
          component={ClientAttachments}
          exact
        />
        <Route
          path="/:objectType/:objectId/tasks/:taskId/completed"
          render={props => <ObjectTask {...props} defaultStateId={1} />}
        />
        <Route
          path="/:objectType/:objectId/tasks/history/:taskId"
          render={props => <ObjectTask {...props} isHistoryTask />}
        />
        <Route
          path="/:objectType/:objectId/tasks/:taskId"
          component={ObjectTask}
        />
        <Route
          path="/:objectType/views/:viewId"
          exact
          render={props => {
            const { match } = props;
            const { objectType, viewId } = match.params;
            if ([Leads, Accounts, Opportunities].indexOf(objectType) !== -1) {
              const pageCode =
                viewId === PhantomId ? "CREATEVIEWLIST" : "EDITVIEWLIST";
              const permissionCode =
                PERMISSIONS[`${objectType.toUpperCase()}_${pageCode}`];
              return (
                <Permission
                  permission={permissionCode}
                  errorComponent={<Unauthentication />}
                >
                  <ObjectView {...props} objectType={objectType} />
                </Permission>
              );
            }
            // TOOD: return 404 page
            return null;
          }}
        />
        <Route
          path="/:objectType/:objectId"
          exact
          render={props => {
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
            return <NotFound />;
          }}
        />
        <Route
          path="/:objectType"
          exact
          render={props => {
            const { match } = props;
            const { objectType } = match.params;
            if ([Leads, Accounts, Opportunities].indexOf(objectType) !== -1) {
              const viewCode = PERMISSIONS[`${objectType.toUpperCase()}_VIEW`];
              return (
                <Permission
                  permission={viewCode}
                  errorComponent={<Unauthentication />}
                >
                  <ObjectList
                    key={objectType}
                    {...props}
                    objectType={objectType}
                  />
                </Permission>
              );
            }
            return <NotFound />;
          }}
        />
      </Switch>
    );
  }
}

export default withRouter(MainContent);
