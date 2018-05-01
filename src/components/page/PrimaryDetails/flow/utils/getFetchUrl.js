/* eslint arrow-parens: ["error", "as-needed"] */
import Enums from 'utils/EnumsManager';

const { ObjectTypes, PhantomId } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

const getLeadFetchUrlById = id => {
  console.log('l');
  if (id === PhantomId) {
    return '/admin/leads/create';
  }
  return `/admin/leads/${id}/page_layout`;
};
const getAccountFetchUrlById = id => {
  console.log('a');
  if (id === PhantomId) {
    return '/admin/accounts/create';
  }
  return `/admin/accounts/${id}/page_layout`;
};
const getOpportunityFetchUrlById = (id, accountId) => {
  console.log('o');
  if (id === PhantomId) {
    return `/admin/opportunities/create/by_account/${accountId}`;
  }
  return `/admin/opportunities/${id}/page_layout`;
};

/**
 *  Get fetch url based on object id and type
 */
export default (id, type, accountId) => {
  switch (type) {
    case Leads:
      return getLeadFetchUrlById(id);
    case Accounts:
      return getAccountFetchUrlById(id);
    case Opportunities:
      return getOpportunityFetchUrlById(id, accountId);
    default:
      return '';
  }
};
