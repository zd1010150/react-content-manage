import { combineReducers } from 'redux';
import users from 'views/Setup/Users/flow/reducer';
import companyInfo from 'views/Setup/CompanyInfo/flow/reducer';
import orgChart from 'views/Setup/OrganisationChart/flow/reducer';
import emailTemplates from 'views/email/flow/reducer';
import permissionPro from 'views/Setup/PermissionProfile/flow/reducer';
import fields from 'views/Setup/Fields/flow/reducer/index';

export default combineReducers({
  users,
  companyInfo,
  orgChart,
  emailTemplates,
  permissionPro,
  fields,
});

