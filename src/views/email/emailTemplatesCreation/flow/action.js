import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import _ from "lodash";
import {
  NEW_TEMPLATE_FOLDER,
  NEW_TEMPLATE_NAME,
  NEW_TEMPLATE_API_NAME,
  NEW_TEMPLATE_DESCRIPTION,
  NEW_TEMPLATE_CONTENT
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
