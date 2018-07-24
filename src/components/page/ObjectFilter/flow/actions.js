// TODO:
import { setFields } from 'components/page/FilterCriteria__REFACTORED/flow/actions';
import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { addToSelection, setAvailableFields } from '../components/FieldsSelection/flow/actions';
import { setConditionLogic, setFilters } from '../components/FilterCriteria/flow/actions';
import { setViewName } from '../components/ViewName/flow/actions';
import { batchAddToSelection, setVisibilityOption } from '../components/ViewVisibility/flow/actions';
import { RESET_VIEW } from './actionTypes';

const getFetchUrlById = (id, objectType) => {
  const baseUrl = '/admin/list_views';
  if (id === Enums.PhantomId) {
    return `${baseUrl}/object/${objectType}/create`;
  }
  return `${baseUrl}/${id}`;
};


export const resetView = () => ({
  type: RESET_VIEW,
});

export const fetchViewById = (id, objectType) => dispatch => get(getFetchUrlById(id, objectType), {}, dispatch).then((json) => {
  if (json && !_.isEmpty(json.all_field) && !_.isEmpty(json.all_field.data)) {
    // TODO: Combine those two actions into one action and a shared substore in redux
    dispatch(setAvailableFields(json.all_field.data));
    dispatch(setFields(json.all_field.data));

    if (id !== Enums.PhantomId
        && !_.isEmpty(json.list_view)
        && !_.isEmpty(json.list_view.data)) {
      const {
        view_name,
        filters,
        condition_logic,
        selectors,
        assign_option,
        assign_to_users,
        assign_to_teams,
      } = json.list_view.data;
      // set section 1
      dispatch(setViewName(view_name));
      // set section 2
      dispatch(setConditionLogic(condition_logic));
      dispatch(setFilters(filters.data));
      // set section 3
      dispatch(addToSelection(selectors.data));
      // set section 4
      dispatch(setVisibilityOption(assign_option));
      dispatch(batchAddToSelection(assign_to_users, assign_to_teams));
    }
  }  
});
