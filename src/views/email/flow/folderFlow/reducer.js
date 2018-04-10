import { combineReducers } from "redux";
import _ from "lodash";
import EnumsManager from "utils/EnumsManager";
import {
    EMAIL_TEMPLATES_SET_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
    EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
    EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
    EMAIL_TEMPLATES_DELETE_USER_FOLDERS,
    EMAIL_TEMPLATES_SET_FOLDERS_ORDER,
    EMAIL_TEMPLATES_UPDATE_FOLDER_NAME,
    EMAIL_TEMPLATES_CREATE_USER_FOLDERS
} from "./actionType";

export const userFolders = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_USER_FOLDERS:
            return action.userFolders;
        case EMAIL_TEMPLATES_DELETE_USER_FOLDERS:
            return state.filter(item => item.id !== action.id);
        case EMAIL_TEMPLATES_SET_FOLDERS_ORDER:
            return action.userFolders;
        case EMAIL_TEMPLATES_UPDATE_FOLDER_NAME:
            const cloneState = _.cloneDeep(state);
            _.update(
                _.find(cloneState, { id: payload.id }),
                "name",
                () => payload.name
            );
            return cloneState;
        case EMAIL_TEMPLATES_CREATE_USER_FOLDERS:
            return [...state, payload];
        default:
            return state;
    }
};

export const sharedFolders = (state = [], action) => {
    const { type, ...payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_SHARED_FOLDERS:
            return action.sharedFolders;
        default:
            return state;
    }
};

export const selectedFolder = (state = {}, action) => {
    const { type } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_SELECTED_FOLDER:
            return action.selectedFolder;
        default:
            return state;
    }
};

export const editFolders = (state = [], action) => {
    const { type } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_EDIT_FOLDERS:
            return [...state, action.editFolders];
        default:
            return state;
    }
};

export const deletedFolders = (state = [], action) => {
    const { type, id } = action;
    switch (type) {
        case EMAIL_TEMPLATES_DELETE_USER_FOLDERS:
            return id > 0 ? [...state, id] : [...state];
        default:
            return state;
    }
};
