import { combineReducers } from "redux";
import _ from "lodash";
import EnumsManager from "utils/EnumsManager";
import {
    EMAIL_TEMPLATES_SET_TEMPLATES
} from "./actionType";

export const templates = (
    state = {
        department_id: "",
        department_text: "",
        templates: [],
        editTemplates: {}
    },
    action
) => {
    const { type, ...payload } = action;
    switch (type) {
        case EMAIL_TEMPLATES_SET_TEMPLATES:
            return Object.assign({}, state, { ...payload });
        default:
            return state;
    }
};