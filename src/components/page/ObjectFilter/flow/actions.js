import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';

import { RESET_VIEW, SAVE_VIEW } from './actionTypes';
import { setViewName } from '../components/ViewName/flow/actions';
import { setConditionLogic } from '../components/FilterCriteria/flow/actions';
import { setAvailableFields, addToSelection } from '../components/FieldsSelection/flow/actions';
import { setVisibilityOption, batchAddToSelection } from '../components/ViewVisibility/flow/actions';

export const resetView = _ => ({
  type: RESET_VIEW,
});

const getFetchUrlById = (id, objectType) => {
  const baseUrl = '/admin/list_views';
  if (id === Enums.PhantomID) {
    return `${baseUrl}/object/${objectType}/create`;
  } else {
    return `${baseUrl}/${id}`;
  }
};

export const fetchViewById = (
  id,
  objectType,
) => dispatch => get(getFetchUrlById(id, objectType), {}, dispatch).then(json => {
  if (id !== Enums.PhantomID) {
    if (json
      && !_.isEmpty(json.all_field)
      && !_.isEmpty(json.all_field.data)
      && !_.isEmpty(json.list_view)
      && !_.isEmpty(json.list_view.data)) {

      const { all_field, list_view } = json;

      const allFieldData = all_field.data;
      const {
        view_name,
        condition_logic,
        selectors,
        assign_option,
        assign_to_users,
        assign_to_teams
      } = list_view.data;
      // set section 1
      dispatch(setViewName(view_name));
      // set section 2
      dispatch(setConditionLogic(condition_logic));
      // set section 3
      dispatch(setAvailableFields(allFieldData));
      dispatch(addToSelection(selectors.data));
      // set section 4
      dispatch(setVisibilityOption(assign_option));
      dispatch(batchAddToSelection(assign_to_users, assign_to_teams));
    }
  } else {
    if (json
      && !_.isEmpty(json.all_field)
      && !_.isEmpty(json.all_field.data)) {

      const { all_field } = json;
      const allFieldData = all_field.data;
      dispatch(setAvailableFields(allFieldData));
    }
  }
});