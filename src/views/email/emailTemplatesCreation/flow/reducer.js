import { combineReducers } from "redux";
import {
  NEW_TEMPLATE_FOLDER,
  NEW_TEMPLATE_NAME,
  NEW_TEMPLATE_API_NAME,
  NEW_TEMPLATE_DESCRIPTION,
  NEW_TEMPLATE_CONTENT,
  EDIT_TEMPLATE_FOLDER,
  EDIT_TEMPLATE_NAME,
  EDIT_TEMPLATE_API_NAME,
  EDIT_TEMPLATE_DESCRIPTION,
  EDIT_TEMPLATE_CONTENT
} from "./actionType";
import { EMAIL_TEMPLATES_UPDATE_TEMPLATE } from "../../flow/actionType";

export const newTemplate = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_TEMPLATE_FOLDER:
      return Object.assign({}, state, { folderId: payload });
    case NEW_TEMPLATE_NAME:
      return Object.assign({}, state, { name: payload });
    case NEW_TEMPLATE_API_NAME:
      return Object.assign({}, state, { apiName: payload });
    case NEW_TEMPLATE_DESCRIPTION:
      return Object.assign({}, state, { description: payload });
    case NEW_TEMPLATE_CONTENT:
      return Object.assign({}, state, { content: payload });
    default:
      return state;
  }
};

export const editTemplate = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_TEMPLATE_FOLDER:
      return Object.assign({}, state, { folderId: payload });
    case EDIT_TEMPLATE_NAME:
      return Object.assign({}, state, { name: payload });
    case EDIT_TEMPLATE_API_NAME:
      return Object.assign({}, state, { apiName: payload });
    case EDIT_TEMPLATE_DESCRIPTION:
      return Object.assign({}, state, { description: payload });
    case EDIT_TEMPLATE_CONTENT:
      return Object.assign({}, state, { content: payload });
    case EMAIL_TEMPLATES_UPDATE_TEMPLATE:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
