import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
  NEW_EMAIL_UPDATE_SELECTED_TEMPLATE,
  NEW_EMAIL_SET_TEMPLATES,
  NEW_EMAIL_TEMPLATES_PAGENATIONS
} from "./actionType";

const updateTemplate = payload => ({
  type: NEW_EMAIL_UPDATE_SELECTED_TEMPLATE,
  payload
});

export const fetchUserEmail = ({ objectType, objectId }, cb, cbErr) => (
    dispatch,
    getState
) => {
    get(
        `/admin/${objectType}/${objectId}`,
        dispatch
    ).then(data => {
        if (!_.isEmpty(data)) {
            if (_.isFunction(cb)) {
                cb(data);
            }
        } else {
            if (_.isFunction(cbErr)) {
                cbErr();
            }
        }
    }).catch((e)=>{
        if (_.isFunction(cbErr)) {
            cbErr();
        }
    });
};

export const fetchSelectedTemplateData = ({ templateId, objectType, objectId, cb, cbErr }) => (
  dispatch,
  getState
) => {
  dispatch(updateTemplate({}));
  get(
    `/admin/email_templates/${templateId}?object_type=${objectType}&object_id=${objectId}`,
    dispatch
  ).then(data => {
    console.log("data", data);
    if (!_.isEmpty(data)) {
      dispatch(updateTemplate(data.data));
      if (_.isFunction(cb)) {
        cb();
      }
    } else {
      if (_.isFunction(cbErr)) {
        cbErr();
      }
    }
  }).catch((e)=>{
      if (_.isFunction(cbErr)) {
          cbErr();
      }
  });
};

//send email
export const sendEmail = ({ userEmail, dataObj, noAuthMessage, emailSendMessage }, cb, cbErr) => (
    dispatch,
    getState
) => {
    post(
        `/admin/emails/auth/${userEmail}`,
        {},
        dispatch,
        { successMessage: noAuthMessage }
    ).then(data => {
        if (!_.isEmpty(data)) {
            if(data.status === 'success'){
                return post(
                    "/admin/emails",
                    dataObj,
                    dispatch,
                    { successMessage: emailSendMessage }
                )
            }else{
                cb(data.status, data.auth_link);
            }
        }
    }).then((data)=>{
        if (!_.isEmpty(data)) {
            if (_.isFunction(cb)) {
                cb(data.status);
            }
        }
    }).catch((e)=>{
        console.log("e", e);
    });
};

//Set Templates
export const newEmailSetTemplatesData = payload => ({
  type: NEW_EMAIL_SET_TEMPLATES,
  payload
});

const setPaginations = (perPage, currentPage, total) => ({
  type: NEW_EMAIL_TEMPLATES_PAGENATIONS,
  perPage,
  currentPage,
  total
});

const fetchTemplates = ({
  perPage = EnumsManager.DefaultPageConfigs.PageSize,
  currentPage = 1,
  search,
  folderId,
  category,
  dispatch
}) => {
  let urlParams;
  //folderId undefined means the folder is just created and has not been saved yet!!!
  if (!folderId) {
    return dispatch(newEmailSetTemplatesData([]));
  }
  if (category) {
      urlParams = {category};
  } else {
      urlParams = {};
  }
  get(
      `/admin/email_templates/email_folders/${folderId}`,
    { ...urlParams, per_page: perPage, page: currentPage, search },
    dispatch
  ).then(data => {
    console.log("11111", data);
    if (data && !_.isEmpty(data.data) && !_.isEmpty(data.meta)) {
      dispatch(newEmailSetTemplatesData(data.data));
      const { pagination } = data.meta;

      dispatch(
        setPaginations(
          pagination.per_page,
          pagination.current_page,
          pagination.total
        )
      );
    }
  });
};

export const newEmailQueryByPaging = ({
  perPage,
  currentPage,
  folderId,
  category
}) => (dispatch, getState) => {
  const state = getState();
  const { searchKey } = state.setup.users.searchKey;
  return fetchTemplates({
    perPage,
    currentPage,
    searchKey,
    folderId,
    category,
    dispatch
  });
};
