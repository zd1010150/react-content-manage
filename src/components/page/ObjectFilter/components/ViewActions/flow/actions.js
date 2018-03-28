import { post, patch } from 'store/http/httpAction';
import { toUtc } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { SAVE_FAILED, SAVE_SUCCESS } from './actionTypes';

// Format redux to cater for API data format requirement
const mapDataToAPI = (object_type, data) => {
  const { name, fields, filterCriteria, visibilities } = data;

  const { view_name } = name;
  
  const { condition_logic, filters } = filterCriteria;
  const formattedFilter = filters.map(filter => {

    const { displayNum, fieldId, conditionId, value } = filter;
    
    let newValue = filter.value;
    // TODO: replace the format with the value from backend
    // TODO: replace offset with user info timezone, need to consider undefined
    if (filter.type === Enums.FieldTypes.Date
        || filter.type === Enums.FieldTypes.DateTime) {
      newValue = toUtc(value, '+1100', filter.type === Enums.FieldTypes.Date ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss');
    }

    return {
      id: fieldId,
      display_num: displayNum,
      condition: conditionId,
      value: newValue,
    };
  });

  const { selectedFields } = fields;
  const selectors = selectedFields.map((field, i) => ({
    id: field.id,
    display_num: i,
  }));

  const { selectedOption, selectedTeams, selectedUsers } = visibilities;
  const assign_to_users = selectedUsers.map(user => user.id);
  const assign_to_teams = selectedTeams.map(team => team.id);

  return {
    view_name,
    object_type,
    condition_logic,
    filters: formattedFilter,
    selectors,
    assign_option: selectedOption,
    assign_to_users,
    assign_to_teams,
  };
};

export const saveSuccess = _ => ({
  type: SAVE_SUCCESS,
});

export const trySaveNew = (objectType, viewData) => dispatch => post('/admin/list_views', mapDataToAPI(objectType, viewData), dispatch).then((data) => {
  if (data && !_.isEmpty(data.data)) {
    dispatch(saveSuccess());
  }
});

export const trySave = (objectType, viewData, id) => dispatch => patch(`/admin/list_views/${id}`, mapDataToAPI(objectType, viewData), dispatch).then((data) => {
  if (data && !_.isEmpty(data.data)) {
    dispatch(saveSuccess());
  }
});