import { combineReducers } from "redux";
import _ from "lodash";
import EnumsManager from "utils/EnumsManager";
import {
    EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT,
    EMAIL_TEMPLATES_ADD_PERMISSION_USER,
    EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION,
    EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS,
    EMAIL_TEMPLATES_SET_PERMISSION_USERS
} from "./actionType";

export const selectedPermissionDepartment = (state = { id: "" }, action) => {
    const { type, ...payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT:
            return Object.assign({}, state, { ...payload });
        default:
            return state;
    }
};

export const addedPermissionDepartment = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT:
            let isDuplicated = false;
            state.map(item => {
                if (item.id === payload.id) {
                    isDuplicated = true;
                }
            });
            return isDuplicated ? state : [...state, payload];
        case EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS:
            return payload;
        case EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION:
            return payload.isTeam
                ? state.filter(item => item.id !== payload.itemId)
                : state;
        default:
            return state;
    }
};

export const addedPermissionUser = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_ADD_PERMISSION_USER:
            let isDuplicated = false;
            state.map(item => {
                if (item.id === payload.id) {
                    isDuplicated = true;
                }
            });
            return isDuplicated ? state : [...state, payload];
        case EMAIL_TEMPLATES_SET_PERMISSION_USERS:
            return payload;
        case EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION:
            return payload.isTeam
                ? state
                : state.filter(item => item.id !== payload.itemId);
        default:
            return state;
    }
};