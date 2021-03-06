import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
  EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SHARED_BY_VISIBLE,
  EMAIL_TEMPLATES_DEPARTMENT_VISIBLE,
  EMAIL_TEMPLATES_PERMISSION_VISIBLE,
  EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  EMAIL_TEMPLATES_SET_USER,
  EMAIL_TEMPLATES_SET_SELECT_USER,
  EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  EMAIL_TEMPLATES_UPDATE_FIELD_OPTION
} from "./actionType";

import {
  updateTemplate,
  replaceTemplate,
  setTemplatesData
} from "./emailTemplateFlow/action";
import {
  setUserFolderData,
  setSharedFolderData,
  setSelectedFolder,
  setEditFolderData,
  deleteEditFolderData,
  setNewOrder,
  updateFolderName,
  createEditFolder
} from "./folderFlow/action";
import {
  setSelectedPermissionTeam,
  addPermissionTeam,
  setPermissionTeams,
  addPermissionUser,
  setPermissionUsers,
  removeEntityFromSelection
} from "./folderPermissionFlow/action";

const url = "/";

export const sortValues = array => dispatch => dispatch(setNewOrder(array));

export const getUserFolderData = (userId, callback) => (dispatch, getState) =>
  get(`/admin/email_folders/user/${userId}`, {}, dispatch).then(data => {
    //data will be {own: {data: []}, shared_by: {data: []}}

    const storedUserFolder = getState().setup.emailTemplates.userFolders;
    const storedSharedFolder = getState().setup.emailTemplates.sharedFolders;
    if (!_.isEmpty(data)) {
      if (
        !_.isEqual(storedUserFolder, data.own.data) ||
        !_.isEqual(storedSharedFolder, data.shared_by.data)
      ) {
        dispatch(setTemplatesData([]));
        dispatch(setPermissionTeams([]));
        dispatch(setPermissionUsers([]));
        dispatch(setSelectedFolder({}));
        if (data.own && !_.isEmpty(data.own.data)) {
          dispatch(setUserFolderData(data.own.data));
        } else {
          dispatch(setUserFolderData([]));
        }
        if (data.shared_by && !_.isEmpty(data.shared_by.data)) {
          dispatch(setSharedFolderData(data.shared_by.data));
        } else {
          dispatch(setSharedFolderData([]));
        }
      }
      callback && callback(data);
    }
  });

//Set Selected Folder
export const setSelectedFolderData = selectedFolder => (dispatch, getState) => {
  dispatch(setSelectedFolder(selectedFolder));

  const sharedToTeams = selectedFolder.shared_to_teams
    ? selectedFolder.shared_to_teams.map(item => ({
        id: item.id,
        name: item.name
      }))
    : [];
  const shardToUsers = selectedFolder.shared_to_users
    ? selectedFolder.shared_to_users.map(item => ({
        id: item.id,
        name: item.name,
        team_id: true
      }))
    : [];
  dispatch(setPermissionTeams(sharedToTeams));
  dispatch(setPermissionUsers(shardToUsers));
};

export const uploadFolders = cb => (dispatch, getState) => {
  const state = getState();
  const { setup } = state;
  post(
    "/admin/email_folders/mass_cud/me",
    {
      current: setup.emailTemplates.editFolders,
      delete: setup.emailTemplates.deletedFolders
    },
    dispatch
  ).then(data => {
    if (!_.isEmpty(data) && data.own && !_.isEmpty(data.own.data)) {
        console.log("data", data);
        dispatch(setUserFolderData(data.own.data));
    }
    if (_.isFunction(cb)) {
      cb();
    }
  });
};

export const setPermissionVisible = isPermissionVisible => ({
  type: EMAIL_TEMPLATES_PERMISSION_VISIBLE,
  isPermissionVisible
});

export const setDepartmentVisible = isDepartmentVisible => ({
  type: EMAIL_TEMPLATES_DEPARTMENT_VISIBLE,
  isDepartmentVisible
});

export const setSharedByVisible = isSharedByVisible => ({
  type: EMAIL_TEMPLATES_SHARED_BY_VISIBLE,
  isSharedByVisible
});

export const setEditFolderViewVisible = isEditFolderViewVisible => ({
  type: EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  isEditFolderViewVisible
});

export const setPermissionSettingVisible = isPermissionSettingVisible => ({
  type: EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE,
  isPermissionSettingVisible
});

const setPaginations = (perPage, currentPage, total) => ({
  type: EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  perPage,
  currentPage,
  total
});

export const createTemplateData = ({
  folderId,
  name,
  apiName,
  content,
  description,
  category,
  attachments,
  cb
}) => (dispatch, getState) => {
  post(
    `/admin/email_templates/email_folders/${folderId}`,
    { name, api_name: apiName, content, description, category, attachments },
    dispatch
  ).then(data => {
    if (!_.isEmpty(data)) {
      console.log("data", data);
      dispatch(queryByPaging({ folderId }));
      if (_.isFunction(cb)) {
        cb();
      }
    }
  });
};

export const updateFieldOption = payload => ({
  type: EMAIL_TEMPLATES_UPDATE_FIELD_OPTION,
  payload
});

export const fetchNewTemplateData = ({ cb, cbErr }) => (dispatch, getState) => {
  get(`/admin/email_templates/create`, dispatch).then(data => {
    console.log("data", data);
    if (!_.isEmpty(data)) {
      dispatch(updateFieldOption(data.field_options));
      if (_.isFunction(cb)) {
        cb();
      }
    } else {
      if (_.isFunction(cbErr)) {
        cbErr();
      }
    }
  });
};

export const fetchTemplateData = ({ templateId, cb, cbErr }) => (
  dispatch,
  getState
) => {
  dispatch(replaceTemplate({}));
  get(`/admin/email_templates/${templateId}`, dispatch).then(data => {
    console.log("data", data);
    if (!_.isEmpty(data)) {
      dispatch(updateFieldOption(data.field_options));
      dispatch(updateTemplate(data.data));
      if (_.isFunction(cb)) {
        cb();
      }
    } else {
      if (_.isFunction(cbErr)) {
        cbErr();
      }
    }
  });
};

export const updateTemplateData = ({
  templateId,
  folderId,
  name,
  apiName,
  content,
  description,
  category,
  attachments,
  cb
}) => (dispatch, getState) => {
  patch(
    `/admin/email_templates/${templateId}`,
    {
      name,
      api_name: apiName,
      content,
      folder_id: folderId,
      description,
      category,
      attachments
    },
    dispatch
  ).then(data => {
    console.log("data", data);
    if (!_.isEmpty(data)) {
      dispatch(queryByPaging({ folderId }));
      if (_.isFunction(cb)) {
        cb();
      }
    }
  });
};

export const updateShareFolderData = ({
  folderId,
  shareToUsers,
  shareToTeams,
  cb
}) => (dispatch, getState) => {
  console.log("folderId", folderId);
  const state = getState();
  post(
    `/admin/email_folders/me/${folderId}/share`,
    { share_to_users: shareToUsers, share_to_teams: shareToTeams },
    dispatch
  ).then(data => {
    if (!_.isEmpty(data)) {
      console.log("data", data);
      dispatch(getUserFolderData(state.loginUser.id));
      if (_.isFunction(cb)) {
        cb();
      }
    }
  });
};

export const deleteTemplate = ({ templateId, folderId, cb }) => (
  dispatch,
  getState
) => {
  httpDelete(`/admin/email_templates/${templateId}`, dispatch).then(data => {
    if (!_.isEmpty(data)) {
      dispatch(queryByPaging({ folderId }));
      console.log("data", data);
    }
    if (_.isFunction(cb)) {
      cb();
    }
  });
};

export const fetchTemplates = ({
  perPage = EnumsManager.DefaultPageConfigs.PageSize,
  currentPage = 1,
  search,
  folderId,
  dispatch
}) => {
  //folderId undefined means the folder is just created and has not been saved yet!!!
  if (!folderId) {
    return dispatch(setTemplatesData([]));
  }
  get(
    `/admin/email_templates/email_folders/${folderId}`,
    { per_page: perPage, page: currentPage, search },
    dispatch
  ).then(data => {
    if (data && !_.isEmpty(data.data) && !_.isEmpty(data.meta)) {
      dispatch(setTemplatesData(data.data));
      const { pagination } = data.meta;

      dispatch(
        setPaginations(
          pagination.per_page,
          pagination.current_page,
          pagination.total
        )
      );
    } else {
        dispatch(setTemplatesData([]));
    }
  });
};

export const queryByPaging = ({ perPage, currentPage, folderId }) => (
  dispatch,
  getState
) => {
  const state = getState();
  const { searchKey } = state.setup.users.searchKey;
  return fetchTemplates({
    perPage,
    currentPage,
    searchKey,
    folderId,
    dispatch
  });
};

/* Display the user */
export const setSelectedTeam = id => ({
  type: EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  id
});

/* set the selected user to show his folder */
export const setSelectedUser = user => ({
  type: EMAIL_TEMPLATES_SET_SELECT_USER,
  user
});

/* set all users*/
export const setAllUser = users => ({
  type: EMAIL_TEMPLATES_SET_USER,
  users
});

export const getAllUser = () => dispatch =>
  get("/admin/users/all", {}, dispatch).then(data => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setAllUser(data.data));
    }
  });

export {
  setUserFolderData,
  setEditFolderData,
  deleteEditFolderData,
  updateFolderName,
  createEditFolder,
  setSelectedPermissionTeam,
  addPermissionTeam,
  addPermissionUser,
  removeEntityFromSelection
};
