import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import {
  SETUP_FIELDS_SET_CURRENT_OBJECT,
  SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS,
  SETUP_FIELDS_TOGGLE_EDITING,
  SETUP_FIELDS_SELECT_FIELD,
  SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS,
  SETUP_FIELDS_SET_ADDED_ATTR,
  SETUP_FIELDS_SET_FIELD_ATTR,
  SETUP_FIELDS_RESET_ADDED_ATTR,
  SETUP_FIELDS_SET_OBJECT_LAYOUT,
  SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE,
  SETUP_FIELDS_DELETE_PICKLIST_VALUE,
  SETUP_FIELDS_ADD_PICKLIST_VALUE,
  SETUP_FIELDS_SET_REPLACE_DIALOG_ATTR,
  SETUP_FIELDS_PICKLIST_VALUE_TOGGLE_ADDING,
  SETUP_FIELDS_PICKLIST_VALUE_MANAGEMENT,
  SETUP_FIELDS_PICKLIST_ADD_RESTRICT_DEPARTMENT_USER,
} from './actionType';


export const setCurrentObject = args => ({
  type: SETUP_FIELDS_SET_CURRENT_OBJECT,
  ...args,
});

/* tableview actions */

export const setRelativesObjectTypeFields = args => ({
  type: SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS,
  ...args,
});
export const toggleEditingStatus = isEditing => ({
  type: SETUP_FIELDS_TOGGLE_EDITING,
  isEditing,
});
export const setSelectedFields = args => ({
  type: SETUP_FIELDS_SELECT_FIELD,
  ...args,
});
export const changeMapping = args => ({
  type: SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS,
  ...args,
});
export const fetchFields = objectType => dispatch => get(`/admin/metadata/object/${objectType}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setCurrentObject({
      fields: {
        main: data.main.data,
        cstm: data.cstm.data,
        mappings: data.mappings,
      },
    }));
    dispatch(setRelativesObjectTypeFields({ objectType, data }));
  }
});
export const saveFieldsMapping = (mappings, cb) => dispatch => patch('/admin/metadata/mass-mapping', { data: mappings }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});
/* replace dialog actions */
export const setReplaceDialog = args => ({
  type: SETUP_FIELDS_SET_REPLACE_DIALOG_ATTR,
  ...args,
});
/* addField actions */

export const setFieldAttr = args => ({
  type: SETUP_FIELDS_SET_FIELD_ATTR,
  ...args,
});

export const setFieldLableisDuplicate = isDuplicate => ({
  type: SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE,
  isDuplicate,
});
export const setAddedFieldAttr = args => ({
  type: SETUP_FIELDS_SET_ADDED_ATTR,
  ...args,
});
export const resetAddedFieldAttr = objType => ({
  type: SETUP_FIELDS_RESET_ADDED_ATTR,
  objType,
});
export const setObjectTypeLayout = args => ({
  type: SETUP_FIELDS_SET_OBJECT_LAYOUT,
  ...args,
});
export const deletePickListValue = picklist => ({
  type: SETUP_FIELDS_DELETE_PICKLIST_VALUE,
  picklist,
});
export const addPickListValue = val => ({
  type: SETUP_FIELDS_ADD_PICKLIST_VALUE,
  val,
});
export const fetchBackground = objectType => dispatch => get(`/admin/metadata/object/${objectType}/create`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data.page_layouts.data)) {
    dispatch(setObjectTypeLayout({ layouts: data.page_layouts.data }));
  }
});
export const duplicatFilter = (objectType, field_name, cb) => dispatch => get(`/admin/metadata/object/${objectType}/checkDuplication`, { field_name }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb(data.is_duplicated, data.suggestion);
  }
});
export const addPickListValueToRemote = (meta_data_id, option_value) => dispatch => post('/admin/picklists', { meta_data_id, option_value }, dispatch).then((data) => {
  if (!_.isEmpty(`${data.data.id}`)) {
    dispatch(addPickListValue(data.data));
  }
});
export const replacePickListValueToRemote = (id, replace_value, cb) => dispatch => patch(`/admin/picklists/${id}/replace`, { replace_value }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});

export const deletePickListValueToRemote = (id, replace_value, cb) => dispatch => httpDelete(`/admin/picklists/${id}`, { replace_value }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});
export const sortPicklistValueToRemote = (ids, cb) => dispatch => patch('/admin/picklists/sort', { ids }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});
export const fetchFieldDetailInfo = fieldId => dispatch => get(`/admin/metadata/${fieldId}/setup`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data['de-active_picklists'])) {
    dispatch(setAddedFieldAttr({
      deactiveList: data['de-active_picklists'].data,
      picklist: data.meta.data.picklists,
    }));
  }
});
export const updatePickListValueStatusToRemote = (id, attrs, cb) => dispatch => patch(`/admin/picklists/${id}`, { ...attrs }, dispatch).then((data) => {
  if (!_.isEmpty(data.data) && _.isFunction(cb)) {
    cb();
  }
});
export const saveFieldToRemote = (objectType, field, cb) => dispatch => post(`/admin/metadata/object/${objectType}`, { ...field }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});
export const updateFieldToRemote = (fieldid, field, cb) => dispatch => patch(`/admin/metadata/${fieldid}`, { ...field }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});

/* picklist visible manage */

export const setPickListValueManagement = args => ({
  type: SETUP_FIELDS_PICKLIST_VALUE_MANAGEMENT,
  ...args,
});
export const toggleAdding = isShowAdding => ({
  type: SETUP_FIELDS_PICKLIST_VALUE_TOGGLE_ADDING,
  isShowAdding,
});

export const getVisibleTeamandUsers = valId => dispatch => get(`/admin/picklists/${valId}/managers`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data.teams)) {
    dispatch(setPickListValueManagement({
      visibleTeams: data.teams,
    }));
  }
  if (!_.isEmpty(data.users)) {
    dispatch(setPickListValueManagement({
      visibleUsers: data.users,
    }));
  }
});
export const getUnVisibleTeamandUsers = valId => dispatch => get(`/admin/picklists/${valId}/restriction`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data.teams)) {
    dispatch(setPickListValueManagement({
      unvisibleTeams: data.teams,
    }));
  }
  if (!_.isEmpty(data.users)) {
    dispatch(setPickListValueManagement({
      unvisibleUsers: data.users,
    }));
  }
});

export const updateRestriciontToRemote = (valId, user_ids, team_ids, cb) => dispatch => patch(`/admin/picklists/${valId}/restriction`, { team_ids, user_ids }, dispatch).then(() => {
  dispatch(toggleAdding(false));
  if (_.isFunction(cb)) {
    cb();
  }
});

export const setAddDepartment = args => ({
  type: SETUP_FIELDS_PICKLIST_ADD_RESTRICT_DEPARTMENT_USER,
  ...args,
});
export const fetchUserAll = () => dispatch => get('/admin/users/all', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setAddDepartment({
      allUsers: data.data,
    }));
  }
});
