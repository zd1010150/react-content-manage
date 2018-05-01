/* eslint arrow-parens: ["error", "as-needed"] */
import Enums from 'utils/EnumsManager';

const { ObjectTypes, PhantomId } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

const getLeadUpdateUrlById = id => {
  if (id === PhantomId) {
    return '/admin/leads';
  }
  return `/admin/leads/${id}`;
};
const getAccountUpdateUrlById = id => {
  if (id === PhantomId) {
    return '/admin/accounts';
  }
  return `/admin/accounts/${id}`;
};
const getOpportunityUpdateUrlById = (id, accountId) => {
  if (id === PhantomId) {
    return `/admin/opportunities/object/account/${accountId}`;
  }
  return `/admin/opportunities/${id}`;
};

/**
 *  Get post / patch url based on object id and type
 */
export default (id, type, accountId) => {
  switch (type) {
    case Leads:
      return getLeadUpdateUrlById(id);
    case Accounts:
      return getAccountUpdateUrlById(id);
    case Opportunities:
      return getOpportunityUpdateUrlById(id, accountId);
    default:
      return '';
  }
};
