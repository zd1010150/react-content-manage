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
  SETUP_FIELDS_SET_OBJECT_LAYOUT, SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE } from './actionType';


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
export const fetchBackground = objectType => dispatch => get(`/admin/metadata/object/${objectType}/create`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data.page_layouts.data)) {
    dispatch(setObjectTypeLayout({ layouts: data.page_layouts.data }));
  }
});
export const duplicatFilter = (objectType, file_name, cb) => dispatch => get(`/admin/metadata/object/${objectType}/checkDuplication`, { file_name }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb(data.is_duplicated, data.recommendation);
  }
});
