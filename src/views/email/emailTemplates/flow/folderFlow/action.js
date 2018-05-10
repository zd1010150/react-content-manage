import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
    EMAIL_TEMPLATES_SET_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
    EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
    EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
    EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_FOLDERS_ORDER,
    EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
    EMAIL_TEMPLATES_CREATE_USER_FOLDERS,
    EMAIL_TEMPLATES_CREATE_EDIT_FOLDERS,
    EMAIL_TEMPLATES_DELETE_EDIT_FOLDERS
} from "./actionType";

const url = "/";

//Set User Folders
export const setUserFolderData = userFolders => ({
    type: EMAIL_TEMPLATES_SET_USER_FOLDERS,
    userFolders
});

//Set Shared Folders
export const setSharedFolderData = sharedFolders => ({
    type: EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
    sharedFolders
});

export const setSelectedFolder = selectedFolder => ({
    type: EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
    selectedFolder
});

//Set edited Folders
export const setEditFolderData = editFolders => ({
    type: EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
    editFolders
});

//Delete User Folders
export const deleteEditFolderData = id => ({
    type: EMAIL_TEMPLATES_DELETE_EDIT_FOLDERS,
    id
});

export const setNewOrder = payload => ({
    type: EMAIL_TEMPLATES_SET_FOLDERS_ORDER,
    payload
});

export const updateFolderName = ({ id, name }) => ({
    type: EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
    payload: { id, name }
});

export const createEditFolder = payload => ({
    type: EMAIL_TEMPLATES_CREATE_EDIT_FOLDERS,
    payload
});