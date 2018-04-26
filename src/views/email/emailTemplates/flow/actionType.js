import {
    EMAIL_TEMPLATES_SET_TEMPLATES,
    EMAIL_TEMPLATES_UPDATE_TEMPLATE,
    EMAIL_TEMPLATES_REPLACE_TEMPLATE
} from './emailTemplateFlow/actionType';
import {
    EMAIL_TEMPLATES_SET_USER_FOLDERS,
    EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
    EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
    EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
    EMAIL_TEMPLATES_SET_FOLDERS_ORDER,
    EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
    EMAIL_TEMPLATES_CREATE_USER_FOLDERS
} from './folderFlow/actionType';
import {
    EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_USER,
    EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION,
    EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS,
    EMAIL_TEMPLATES_SET_PERMISSION_USERS
} from './folderPermissionFlow/actionType';



// add new team
export const EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME = 'EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME';
export const EMAIL_TEMPLATES_RESET_NEW_DEPARTMENT = 'EMAIL_TEMPLATES_RESET_NEW_DEPARTMENT';

// tree
export const EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT = 'EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT';

// user
export const EMAIL_TEMPLATES_SET_USER = 'EMAIL_TEMPLATES_SET_USER';
export const EMAIL_TEMPLATES_SET_SELECT_USER = 'EMAIL_TEMPLATES_SET_SELECT_USER';

// sort team tree
export const EMAIL_TEMPLATES_SET_SORTING_TEAM = 'EMAIL_TEMPLATES_SET_SORTING_TEAM';

// ui
export const EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE = 'EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE';
export const EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE = 'EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE';
export const EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE = 'EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE';
export const EMAIL_TEMPLATES_SHARED_BY_VISIBLE ='EMAIL_TEMPLATES_SHARED_BY_VISIBLE';
export const EMAIL_TEMPLATES_DEPARTMENT_VISIBLE = 'EMAIL_TEMPLATES_DEPARTMENT_VISIBLE';
export const EMAIL_TEMPLATES_PERMISSION_VISIBLE = 'EMAIL_TEMPLATES_PERMISSION_VISIBLE';

//templates
export const EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS = 'EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS;';

export {
    EMAIL_TEMPLATES_SET_TEMPLATES,
    EMAIL_TEMPLATES_UPDATE_TEMPLATE,
    EMAIL_TEMPLATES_REPLACE_TEMPLATE,
    EMAIL_TEMPLATES_SET_USER_FOLDERS,
    EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
    EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
    EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
    EMAIL_TEMPLATES_SET_FOLDERS_ORDER,
    EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
    EMAIL_TEMPLATES_CREATE_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_USER,
    EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION,
    EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS,
    EMAIL_TEMPLATES_SET_PERMISSION_USERS
}