import { get, patch, post, httpDelete } from "store/http/httpAction";
import { fetchTeams } from "store/global/action";
import { DEFAULT_DEPAREMTN } from "config/app.config";
import EnumsManager from "utils/EnumsManager";
import _ from "lodash";
import {
    EMAIL_TEMPLATES_SET_TEMPLATES,
    EMAIL_TEMPLATES_UPDATE_TEMPLATE,
    EMAIL_TEMPLATES_REPLACE_TEMPLATE
} from "./actionType";

const url = "/";

//Update new template
export const updateTemplate = payload => ({
    type: EMAIL_TEMPLATES_UPDATE_TEMPLATE,
    payload
});

export const replaceTemplate = payload => ({
    type: EMAIL_TEMPLATES_REPLACE_TEMPLATE,
    payload
});

//Set Templates
export const setTemplatesData = templates => ({
    type: EMAIL_TEMPLATES_SET_TEMPLATES,
    templates
});
