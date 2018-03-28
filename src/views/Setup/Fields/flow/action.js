import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import { SETUP_FIELDS_SET_CURRENT_OBJECT, SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS, SETUP_FIELDS_TOGGLE_EDITING, SETUP_FIELDS_SELECT_FIELD, SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS } from './actionType';

/* tableview actions */
export const setCurrentObject = args => ({
  type: SETUP_FIELDS_SET_CURRENT_OBJECT,
  ...args,
});
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
export const saveFieldsMapping = mappings => dispatch => post('/admin/metadata/mass-mapping',{data:mappings}, dispatch).then(data=>{
  console.log(data,"save result");
})

