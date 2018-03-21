import { combineReducers } from 'redux';
import users from 'views/Setup/Users/flow/reducer';
import companyInfo from 'views/Setup/CompanyInfo/flow/reducer';
import orgChart from 'views/Setup/OrganisationChart/flow/reducer';
import emailTemplates from 'views/emailTemplates/flow/reducer';


export default combineReducers({
  users,
  companyInfo,
  orgChart,
  emailTemplates
});
