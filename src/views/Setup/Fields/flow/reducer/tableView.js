import { combineReducers } from 'redux';
import _ from 'lodash';
import { SETUP_FIELDS_SET_CURRENT_OBJECT, SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS, SETUP_FIELDS_TOGGLE_EDITING, SETUP_FIELDS_SELECT_FIELD, SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS } from '../actionType';
import { objectTypeRelations } from '../objectTypeHelper';
import { OBJECT_TYPES } from 'config/app.config';
import { fieldCategory } from '../objectTypeHelper';


const updateMapping = (state, {
  checked, fromField, toField, toObject, fromObject, fieldCategory,
}) => {
  const allFields = state.fields[fieldCategory];
  let newMappings = state.fields.mappings.slice(),
    newMappingData = [],
    newFields = [];
  const mappings = newMappings.filter(m => m.from_object_type === fromObject && m.to_object_type === toObject);
  newMappingData = _.isEmpty(mappings) ? {} : mappings[0].mapping_data;
  newFields = allFields.map((f) => {
    if (f.id === fromField.id) {
      let mapTo,
        notExist;
      if (!_.isEmpty(f.map_to[toObject])) {
        mapTo = f.map_to[toObject].slice();
        notExist = _.isEmpty(_.find(mapTo, { id: toField.id }));
        if (checked && notExist) { // 新增
          mapTo.push(toField);
          newMappingData[toField.id] = f.id;
        } else if (!checked && !notExist) { // 删除
          mapTo = _.filter(mapTo, i => i.id !== toField.id);
          Object.keys(newMappingData).filter(key => key !== toField.id);
          delete (newMappingData[toField.id]);
        }
        return Object.assign({}, f, { map_to: Object.assign({}, f.map_to, { [toObject]: mapTo }) });
      } else if (checked && _.isEmpty(f.map_to[toObject])) {
        newMappingData[toField.id] = f.id;
        return Object.assign({}, f, { map_to: Object.assign({}, f.map_to, { [toObject]: [toField] }) });
      }
    }
    return f;
  });
  if (_.isEmpty(mappings)) {
    newMappings.push({
      from_object_type: fromObject,
      to_object_type: toObject,
      mapping_data: newMappingData,
    });
  } else {
    newMappings = newMappings.map((m) => {
      if (m.from_object_type === fromObject && m.to_object_type === toObject) {
        m.mapping_data = newMappingData;
      }
      return m;
    });
  }
  return Object.assign({}, state, { fields: Object.assign({}, state.fields, { [fieldCategory]: newFields, mappings: newMappings }) });
};
const currentObject = (state = { objType: OBJECT_TYPES.leads, fields: { [fieldCategory.MAIN]: [], [fieldCategory.CUSTOM]: [], mappings: [] } }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_CURRENT_OBJECT:
      return Object.assign({}, state, { ...payload });
    case SETUP_FIELDS_CHANGE_MAPPING_FIELD_STATUS:
      return updateMapping(state, payload);
    default:
      return state;
  }
};

const filterRelativeFields = (objectType, data) => {
  const { from, to } = objectTypeRelations[objectType];
  const fromFields = {};
  const toFields = {};
  from.forEach((type) => {
    let datas = [];
    if (!_.isEmpty(data[type].data)) {
      datas = data[type].data;
    }
    fromFields[type] = datas;
  });
  to.forEach((type) => {
    let datas = [];
    if (!_.isEmpty(data[type].data)) {
      datas = data[type].data;
    }
    toFields[type] = datas;
  });
  return {
    from: fromFields,
    to: toFields,
  };
};
const relativeFields = (state = { from: {}, to: {} }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS:
      return filterRelativeFields(payload.objectType, payload.data);
    default:
      return state;
  }
};


const selectedField = (state = {
  fromField: {}, mapToOfFromField: [], fieldCategory: '', toObjectType: '', fromObjectType: '',
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SELECT_FIELD:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const ui = (state = { isEditing: false }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_TOGGLE_EDITING:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
export default combineReducers({
  currentObject,
  relativeFields,
  ui,
  selectedField,
});
