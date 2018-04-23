import { get } from 'store/http/httpAction';
import { SET_MODULE_DATA, SET_MODULES } from './actionTypes';
import Enums from 'utils/EnumsManager';

const { DetailModules } = Enums;
const {
  Opportunities,
  TaskOpen,
  TaskHistory,
  EmailSent,
  Attachments,
  Logs,
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
      // TODO: API not finished yet
      url = `crm_logs/object/${objectType}/${objectId}/index`;
      break;
    case TaskOpen:
      url = `tasks/object/${objectType}/${objectId}/open/index`;
      break;
    case TaskHistory:
      url = `tasks/object/${objectType}/${objectId}/history/index`;
      break;
    case EmailSent:
      // TODO: API not finished yet
      url = `crm_logs/object/${objectType}/${objectId}/index`;
      break;
    case Attachments:
      url = `files/object/${objectType}/${objectId}/index`;
      break;
    case Logs:
      url = `crm_logs/object/${objectType}/${objectId}/index`;
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
    if (data
        && !_.isEmpty(data.data)
        && !_.isEmpty(data.meta)) {
      dispatch(setModuleData(code, data.data, data.meta));
    }
  });
