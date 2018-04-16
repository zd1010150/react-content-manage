import { get, patch, post, httpDelete } from 'store/http/httpAction';
import { fetchTeams } from 'store/global/action';
import { DEFAULT_DEPAREMTN } from 'config/app.config';
import _ from 'lodash';
import {} from './actionType';



export const getEmailCampaignData = userId => dispatch =>
    get(`/admin/email_campaign`, {}, dispatch).then(data => {
        console.log('1111', data)
        if (data.own && !_.isEmpty(data.own.data)) {
            dispatch(setUserFolderData(data.own.data));
        } else {
            dispatch(setUserFolderData([]));
        }
    });

//Set User Folders
export const setUserFolderData = userFolders => ({
    type: EMAIL_CAMPAIGN_SET_USER_FOLDERS,
    userFolders
});