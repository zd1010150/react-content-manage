import { get, httpDelete } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { SET_MODULE_DATA, SET_MODULES } from './actionTypes';

const { DetailModules } = Enums;
const {
  Opportunities,
  TaskOpen,
  TaskHistory,
  EmailSent,
  Attachments,
  Logs,
  Invoice,
} = DetailModules;

const concatParams = (params) => {
  if (_.isEmpty(params)) return '';

  let str = '?';
  _.forOwn(params, (value, key) => {
    str += `${key}=${value}&`;
  });
  return str;
};

const getModuleFetchUrl = (code, objectType, objectId, params) => {
  let url = '';
  switch (code) {
    case Opportunities:
      url = `opportunities/object/account/${objectId}`;
      break;
    case TaskOpen:
      url = `tasks/object/${objectType}/${objectId}/open/index`;
      break;
    case TaskHistory:
      url = `tasks/object/${objectType}/${objectId}/history/index`;
      break;
    case EmailSent:
      url = `emails/object/${objectType}/${objectId}/index`;
      break;
    case Attachments:
      url = `files/object/${objectType}/${objectId}/index`;
      break;
    case Logs:
      url = `crm_logs/object/${objectType}/${objectId}/index`;
      break;
    case Invoice:
      url = `invoice/for-object/${objectType}/${objectId}`;
      break;
    default:
      console.log(' No such module.');
  }
  return `/admin/${url}${concatParams(params)}`;
};

export const setModules = modules => ({
  type: SET_MODULES,
  payload: { modules },
});

export const setModuleData = (code, data, meta) => ({
  type: SET_MODULE_DATA,
  payload: { code, data, meta },
});

export const tryFetchModuleData = (code, objectType, objectId, params) => dispatch =>
  get(getModuleFetchUrl(code, objectType, objectId, params), {}, dispatch).then((data) => {
    if (data && data.data
        && !_.isEmpty(data.meta)) {
      dispatch(setModuleData(code, data.data, data.meta));
    }
  });


//
export const tryDeleteTask = (code, taskId, objectType, objectId) => dispatch =>
  httpDelete(`/admin/tasks/${taskId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      // TODO: replace per_page with actual params
      dispatch(tryFetchModuleData(code, objectType, objectId, { page: 1, per_page: 10 }));
    }
  });


//
export const tryDeleteAttachment = (code, fileId, objectType, objectId) => dispatch =>
  httpDelete(`/admin/files/${fileId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      // TODO: replace per_page with actual params
      dispatch(tryFetchModuleData(code, objectType, objectId, { page: 1, per_page: 10 }));
    }
  });

export const tryDeleteInvoice = (code, invoiceId, objectType, objectId) => dispatch =>
  httpDelete(`/admin/invoice/${invoiceId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      // TODO: replace per_page with actual params
      dispatch(tryFetchModuleData(code, objectType, objectId, { page: 1, per_page: 10 }));
    }
  });
