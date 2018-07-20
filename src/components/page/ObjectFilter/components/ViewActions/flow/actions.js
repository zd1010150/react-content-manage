import { httpDelete, patch, post } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { DONE } from './actionTypes';

const {
  DateOnly,
  DateTime,
  Lookup,
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
    
    if (type === Lookup) {
      const moveValueSpace = value.trim();
      if (moveValueSpace.slice(-1) === ',') {
        newValue = value.substring(0, moveValueSpace.lastIndexOf(','));
      }
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

export const done = () => ({
  type: DONE,
});


export const trySaveNew = (objectType, viewData) => dispatch =>
  post('/admin/list_views', mapDataToAPI(objectType, viewData), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(done());
    }
  });


export const trySave = (objectType, viewData, id) => dispatch =>
  patch(`/admin/list_views/${id}`, mapDataToAPI(objectType, viewData), dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(done());
    }
  });


export const tryDeleteView = viewId => dispatch =>
  httpDelete(`/admin/list_views/${viewId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(done());
    }
  });
