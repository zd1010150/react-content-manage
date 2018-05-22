import { post } from 'store/http/httpAction';
import { mapToApi as detailsMapToApi } from 'components/page/ConvertDetails/flow/utils';
import { mapToApi as taskMapToApi } from 'components/page/TaskDetails/flow/utils';
import { SET_ACCOUNT_ID, RESET } from './actionTypes';

const getPayload = (store) => {
  const convertDetails = detailsMapToApi(store.convertDetails);
  const taskDetails = taskMapToApi(store.taskDetails);
  return {
    ...convertDetails,
    task: { ...taskDetails },
  };
};

export const setAccountId = accountId => ({
    type: SET_ACCOUNT_ID,
    payload: { accountId },
  });

export const tryConvertLead = objectId => (dispatch, getState) =>
  post(`/admin/leads/${objectId}/convert`, getPayload(getState()), dispatch).then((data) => {
    if (data && data.account && data.account.id) {
      dispatch(setAccountId(data.account.id));
    }
  });


export const reset = () => ({
  type: RESET,
});
