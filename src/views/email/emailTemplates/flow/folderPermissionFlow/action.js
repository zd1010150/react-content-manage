import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
  EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT,
  EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT,
  EMAIL_TEMPLATES_ADD_PERMISSION_USER,
  EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION,
  EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS,
  EMAIL_TEMPLATES_SET_PERMISSION_USERS
} from "./actionType";

const url = "/";

export const setSelectedPermissionTeam = id => ({
  type: EMAIL_TEMPLATES_SET_SELECTED_PERMISSION_DEPARTMENT,
  id
});

/* Add the team to shared folder*/
export const addPermissionTeam = payload => ({
  type: EMAIL_TEMPLATES_ADD_PERMISSION_DEPARTMENT,
  payload
});

/* set teams to shared folder*/
export const setPermissionTeams = payload => ({
  type: EMAIL_TEMPLATES_SET_PERMISSION_DEPARTMENTS,
  payload
});

/* Add the user to shared folder*/
export const addPermissionUser = payload => ({
  type: EMAIL_TEMPLATES_ADD_PERMISSION_USER,
  payload
});

/* set uses to shared folder*/
export const setPermissionUsers = payload => ({
  type: EMAIL_TEMPLATES_SET_PERMISSION_USERS,
  payload
});

export const removeEntityFromSelection = payload => ({
  type: EMAIL_TEMPLATES_REMOVE_ENTITY_FROM_SELECTION,
  payload
});
