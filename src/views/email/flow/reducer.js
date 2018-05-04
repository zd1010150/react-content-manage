import { combineReducers } from "redux";
import {
  ui,
  newTeam,
  selectedDepartment,
  selectedPermissionDepartment,
  allUsers,
  selectedUser,
  sortingTeams,
  templates,
  templatesDataTablePagination,
  userFolders,
  sharedFolders,
  selectedFolder,
  editFolders,
  deletedFolders,
  newTemplate,
  editTemplate,
  addedPermissionDepartment,
  addedPermissionUser,
  fieldOption
} from "../emailTemplates/flow/reducer";
import {
  selectedEmailTemplate,
  newEmailTemplatesDataTablePagination,
  newEmailTemplates
} from "../newEmail/flow/reducer";

export default combineReducers({
  ui,
  newTeam,
  selectedDepartment,
  selectedPermissionDepartment,
  allUsers,
  selectedUser,
  sortingTeams,
  templates,
  templatesDataTablePagination,
  userFolders,
  sharedFolders,
  selectedFolder,
  editFolders,
  deletedFolders,
  newTemplate,
  editTemplate,
  addedPermissionDepartment,
  addedPermissionUser,
  fieldOption,
  selectedEmailTemplate,
  newEmailTemplatesDataTablePagination,
  newEmailTemplates
});
