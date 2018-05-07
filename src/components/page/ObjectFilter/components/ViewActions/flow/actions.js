import { patch, post } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { SAVE_SUCCESS } from './actionTypes';

const {
  DateOnly,
  DateTime,
} = Enums.FieldTypes;

// Format redux to cater for API data format requirement
const mapDataToAPI = (objectType, data) => {
  const {
    name,
    fields,
    filterCriteria,
    visibilities,
  } = data;
  const { view_name } = name;

  const { condition_logic, filters } = filterCriteria;
  const formattedFilter = filters.map((filter) => {
    const {
      displayNum,
      fieldId,
      conditionId,
      value,
      type,
    } = filter;
    let newValue = filter.value;
    if (type === DateOnly || type === DateTime) {
      newValue = toUtc(value, type === DateTime);
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
  const assignees = selectedUsers.map(user => user.id);
  const assignedTeams = selectedTeams.map(team => team.id);

  return {
    view_name,
    object_type: objectType,
    condition_logic,
    filters: formattedFilter,
    selectors,
    assign_option: selectedOption,
    assign_to_users: assignees,
    assign_to_teams: assignedTeams,
  };
};

export const saveSuccess = () => ({
  type: SAVE_SUCCESS,
});

export const trySaveNew = (objectType, viewData) => dispatch =>
  post('/admin/list_views', mapDataToAPI(objectType, viewData), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(saveSuccess());
    }
  });

export const trySave = (objectType, viewData, id) => dispatch =>
  patch(`/admin/list_views/${id}`, mapDataToAPI(objectType, viewData), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(saveSuccess());
    }
  });
