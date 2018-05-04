import { combineReducers } from 'redux';
import {NEW_EMAIL_UPDATE_SELECTED_TEMPLATE, NEW_EMAIL_TEMPLATES_PAGENATIONS, NEW_EMAIL_SET_TEMPLATES} from './actionType';
import EnumsManager from "utils/EnumsManager";

const selectedEmailTemplate = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case NEW_EMAIL_UPDATE_SELECTED_TEMPLATE:
            return payload;
        default:
            return state;
    }
};
const newEmailTemplatesDataTablePagination = (
    state = {
        perPage: EnumsManager.DefaultPageConfigs.PageSize,
        currentPage: 1,
        total: 0
    },
    action
) => {
    switch (action.type) {
        case NEW_EMAIL_TEMPLATES_PAGENATIONS:
            return {
                perPage: action.perPage,
                currentPage: action.currentPage,
                total: action.total
            };
        default:
            return state;
    }
};

const newEmailTemplates = (
    state = [],
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case NEW_EMAIL_SET_TEMPLATES:
            return payload;
        default:
            return state;
    }
};

export {
    selectedEmailTemplate,
    newEmailTemplatesDataTablePagination,
    newEmailTemplates
}

