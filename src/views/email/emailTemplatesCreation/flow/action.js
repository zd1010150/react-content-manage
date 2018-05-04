import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import _ from "lodash";
import {
  NEW_TEMPLATE_FOLDER,
  NEW_TEMPLATE_NAME,
  NEW_TEMPLATE_API_NAME,
  NEW_TEMPLATE_DESCRIPTION,
  NEW_TEMPLATE_CONTENT,
  NEW_TEMPLATE_CATEGORY,
  EDIT_TEMPLATE_FOLDER,
  EDIT_TEMPLATE_NAME,
  EDIT_TEMPLATE_API_NAME,
  EDIT_TEMPLATE_DESCRIPTION,
  EDIT_TEMPLATE_CONTENT,
  EDIT_TEMPLATE_CATEGORY
} from "./actionType";

//set new template folder
export const setNewTemplateFolder = payload => ({
  type: NEW_TEMPLATE_FOLDER,
  payload
});
//set new template name
export const setNewTemplateName = payload => ({
  type: NEW_TEMPLATE_NAME,
  payload
});
//set new template api name
export const setNewTemplateApiName = payload => ({
  type: NEW_TEMPLATE_API_NAME,
  payload
});
//set new template description
export const setNewTemplateDescription = payload => ({
  type: NEW_TEMPLATE_DESCRIPTION,
  payload
});
//set new template content
export const setNewTemplateContent = payload => ({
  type: NEW_TEMPLATE_CONTENT,
  payload
});
//set new template category
export const setNewTemplateCategory = payload => ({
  type: NEW_TEMPLATE_CATEGORY,
  payload
});

//set Edit template folder
export const setEditTemplateFolder = payload => ({
  type: EDIT_TEMPLATE_FOLDER,
  payload
});
//set Edit template name
export const setEditTemplateName = payload => ({
  type: EDIT_TEMPLATE_NAME,
  payload
});
//set Edit template api name
export const setEditTemplateApiName = payload => ({
  type: EDIT_TEMPLATE_API_NAME,
  payload
});
//set Edit template description
export const setEditTemplateDescription = payload => ({
  type: EDIT_TEMPLATE_DESCRIPTION,
  payload
});
//set Edit template content
export const setEditTemplateContent = payload => ({
  type: EDIT_TEMPLATE_CONTENT,
  payload
});
//set Edit template category
export const setEditTemplateCategory = payload => ({
  type: EDIT_TEMPLATE_CATEGORY,
  payload
});
