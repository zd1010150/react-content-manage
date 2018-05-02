/* eslint arrow-parens: ["error", "as-needed"] */
import Enums from 'utils/EnumsManager';
import { patch, post } from 'store/http/httpAction';

const { ObjectTypes, PhantomId } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

/*---------------------------------------------------------------------
  |  Get fetch url by object type, object id and account id
  *-------------------------------------------------------------------*/
const getLeadFetchUrlById = id => {
  if (id === PhantomId) {
    return '/admin/leads/create';
  }
  return `/admin/leads/${id}/page_layout`;
};
const getAccountFetchUrlById = id => {
  if (id === PhantomId) {
    return '/admin/accounts/create';
  }
  return `/admin/accounts/${id}/page_layout`;
};
const getOpportunityFetchUrlById = (id, accountId) => {
  if (id === PhantomId) {
    return `/admin/opportunities/create/by_account/${accountId}`;
  }
  return `/admin/opportunities/${id}/page_layout`;
};


/**
 * Get fetch url
 * @param {string} id
 * @param {string} type
 * @param {string} accountId
 */
export const getFetchUrl = (id, type, accountId) => {
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


/*---------------------------------------------------------------------
  |  Get Post / Patch url by object type, object id and account id
  *-------------------------------------------------------------------*/
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
 *  Get post / patch url
 */
export const getUpdateUrl = (id, type, accountId) => {
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


/*---------------------------------------------------------------------
  |  Get request method by object id
  *-------------------------------------------------------------------*/
/**
 * 
 * @param {string} id
 */
export const getRequestMethod = (id = PhantomId) => {
  if (id === PhantomId) {
    return post;
  }
  return patch;
};
