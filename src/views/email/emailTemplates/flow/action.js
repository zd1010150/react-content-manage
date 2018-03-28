import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
  EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_ADD_VISIBLE,
  EMAIL_TEMPLATES_RESET_NEW_DEPARMENT,
  EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME,
  EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  EMAIL_TEMPLATES_SET_USER,
  EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  EMAIL_TEMPLATES_SET_SELECT_USER,
  EMAIL_TEMPLATES_SET_SORTING_TEAM,
  EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_TEMPLATES,
  EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  EMAIL_TEMPLATES_SHARED_BY_VISIBLE,
  EMAIL_TEMPLATES_DEPARTMENT_VISIBLE,
  EMAIL_TEMPLATES_SET_USER_FOLDERS,
  EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
  EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
  EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
  EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
  EMAIL_TEMPLATES_SET_NEW_ORDER,
  EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
  EMAIL_TEMPLATES_CREATE_USER_FOLDERS
} from "./actionType";

const url = "/";

export const createUserFolder = payload => ({
  type: EMAIL_TEMPLATES_CREATE_USER_FOLDERS,
  payload
});

export const updateFolderName = ({ id, name }) => ({
  type: EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
  payload: { id, name }
});

export const setNewOrder = userFolders => ({
  type: EMAIL_TEMPLATES_SET_NEW_ORDER,
  userFolders
});

export const sortValues = array => dispatch => dispatch(setNewOrder(array));

export const getUserFolderData = userId => dispatch =>
  get(`/admin/email_folders/user/${userId}`, {}, dispatch).then(data => {
      //data will be {own: {data: []}, shared_by: {data: []}}
      console.log('1111', data)
    if (data.own && !_.isEmpty(data.own.data)) {
      dispatch(setUserFolderData(data.own.data));
    } else {
      dispatch(setUserFolderData([]));
    }
    if(data.shared_by && !_.isEmpty(data.shared_by.data)){
        dispatch(setSharedFolderData(data.shared_by.data));
    }else {
        dispatch(setSharedFolderData([]));
    }
  });

//Set User Folders
export const setUserFolderData = userFolders => ({
  type: EMAIL_TEMPLATES_SET_USER_FOLDERS,
  userFolders
});

//Delete User Folders
export const deleteUserFolderData = id => ({
  type: EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
  id
});

//Set Shared Folders
export const setSharedFolderData = sharedFolders => ({
  type: EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
  sharedFolders
});

//Set edited Folders
export const setEditFolderData = editFolders => ({
  type: EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
  editFolders
});

//Set Selected Folder
export const setSelectedFolderData = selectedFolder => ({
  type: EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
  selectedFolder
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

/* ADD */
export const setAddVisible = isAddVisible => ({
  type: EMAIL_TEMPLATES_SET_ADD_VISIBLE,
  isAddVisible
});

//Set Templates
export const setTemplatesData = templates => ({
  type: EMAIL_TEMPLATES_SET_TEMPLATES,
  templates
});
const setPaginations = (perPage, currentPage, total) => ({
  type: EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  perPage,
  currentPage,
  total
});

// TODO The url will change to /templates/list
export const fetchTemplates = ({
  perPage = EnumsManager.DefaultPageConfigs.PageSize,
  currentPage = 1,
  search,
  folderId,
  dispatch
}) => {
    //folderId undefined means the folder is just created and has not been saved yet!!!
    if(!folderId){
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
        }
    });
}

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

export const setNewDepartName = name => ({
  type: EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME,
  name
});
export const resetNewDepartment = () => ({
  type: EMAIL_TEMPLATES_RESET_NEW_DEPARMENT
});
/* Display the user */
export const setSelectedTeam = id => ({
  type: EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  id
});
export const setSeleteTeamDialogVisible = isSelectTeamDialogVisible => ({
  type: EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  isSelectTeamDialogVisible
});

export const setSelectedUser = user => ({
  type: EMAIL_TEMPLATES_SET_SELECT_USER,
  user
});

export const setAllUser = users => ({
  type: EMAIL_TEMPLATES_SET_USER,
  users
});
/* Sort teams */
export const setSortingTeam = sortingTeams => ({
  type: EMAIL_TEMPLATES_SET_SORTING_TEAM,
  sortingTeams
});
export const addDepartment = (name, parentId, cb) => dispatch =>
  post("/admin/teams", { name, parent_id: parentId }, dispatch).then(data => {
    if (!_.isEmpty(data)) {
      dispatch(fetchTeams());
    }
    if (_.isFunction(cb)) {
      cb();
    }
  });

export const getAllUser = () => dispatch =>
  get("/admin/users/all", {}, dispatch).then(data => {
    if (!_.isEmpty(data.data)) {
      dispatch(setAllUser(data.data));
    }
  });
export const deleteDepartment = id => dispatch =>
  httpDelete(`/admin/teams/${id}`, {}, dispatch).then(data => {
    if (!_.isEmpty(data)) {
      dispatch(fetchTeams());
      dispatch(getAllUser());
      dispatch(setSelectedTeam(DEFAULT_DEPAREMTN.id));
    }
  });

export const updateTeam = (id, name, cb) => dispatch =>
  patch(`/admin/teams/${id}`, { name }, dispatch).then(data => {
    if (!_.isEmpty(data)) {
      dispatch(fetchTeams());
    }
    if (_.isFunction(cb)) {
      cb();
    }
  });

export const sortDepartment = cb => (dispatch, getState) =>
  patch(
    "/admin/teams/struct/sort",
    { teams: getState().global.settings.teams },
    dispatch
  ).then(data => {
    if (!_.isEmpty(data)) {
      dispatch(fetchTeams());
    }
    if (_.isFunction(cb)) {
      cb();
    }
  });
