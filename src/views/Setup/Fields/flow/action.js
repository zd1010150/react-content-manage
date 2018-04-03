import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import {
  SETUP_FIELDS_SET_CURRENT_OBJECT,
  SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS,
  SETUP_FIELDS_TOGGLE_EDITING,
  SETUP_FIELDS_SELECT_FIELD,
  SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS,
  SETUP_FIELDS_SET_ADDED_ATTR,
  SETUP_FIELDS_RESET_ADDED_ATTR,
  SETUP_FIELDS_SET_OBJECT_LAYOUT,
  SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE,
  SETUP_FIELDS_DELETE_PICKLIST_VALUE,
  SETUP_FIELDS_ADD_PICKLIST_VALUE,
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
export const saveFieldsMapping = mappings => dispatch => patch('/admin/metadata/mass-mapping', { data: mappings }, dispatch).then((data) => {
  console.log(data, 'save result');
});

/* addField actions */
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
export const replacePickListValueToRemote = (id, replace_value) => dispatch => patch(`/admin/picklists/${id}/replace`, { replace_value }, dispatch).then((data) => {

});
export const sortPicklistValueToRemote = ids => dispatch => patch('/admin/picklists/sort', { ids }, dispatch).then((data) => {

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
export const fetchFieldDetailInfo = fieldId => dispatch => get(`/admin/metadata/${fieldId}/setup`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data['de-active_picklists'])) {
    dispatch(setAddedFieldAttr({
      deactiveList: data['de-active_picklists'],
    }));
  }
});

