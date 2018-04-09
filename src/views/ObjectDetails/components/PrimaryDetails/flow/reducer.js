import {
  SET_DATA_SOURCE,
  SET_ACTIVE_FIELD,
  RESET_ACTIVE_FIELD,
  SET_FIELD_VALUE,
  RESET_FIELD_VALUE,
  REVERT_ALL_FIELDS,
  SET_FIELD_OPTIONS,
  RESET,
} from './actionTypes';

const initialState = {
  source: [],
  data: [],
};

// The transfer will help us to be isolated from backend json format.
// If the backend response structure changed, we can change this place only, instead of changing all components uses the data.
const mapFields = data => {
  return data.map(field => {
    const { id, page_readonly, page_required, meta, value } = field;
    const {
      field_name,
      field_label,
      crm_data_type,
      help_text,
      picklists,
      lookup_own_field_name,
      precision,
      scale,
    } = meta;
    
    // TODO: convert value to locale string when type is date/datetime
    // formattedValue = crm_data_type === dateonly || datetime ? toLocale...;

    // lookup field value property name is varied by different model
    return {
      active: false,
      helpText: help_text,
      id, // used by lookup field for fetchinig data
      initialValue: value === undefined ? '' : value,
      key: id,
      label: field_label,
      lookupDisplayKey: lookup_own_field_name,
      name: field_name,
      options: picklists,
      precision,
      readOnly: page_readonly,
      required: page_required,
      scale,
      type: crm_data_type,
      value: value === undefined ? '' : value,
    };
  });
};

const mapSections = data => {
  return data.map(section => {
    const { code, label, fields, columns } = section;
    const newFields = mapFields(fields);
    return {
      code,
      label,
      fields: mapFields(fields),
      columns,
    };
  });
};

const findFieldById = (fieldId, sectionCode, sections) => {
  const targetSection = sections.find(section => section.code === sectionCode);
  if (!targetSection) return null;

  const targetField = targetSection.fields.find(field => field.id === fieldId);
  if (!targetField) return null;

  return targetField;
};

const primaryDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_SOURCE:
      const { dataSource } = action.payload;
      const dataCopy = _.cloneDeep(dataSource);

      return {
        ...state,
        source: mapSections(dataSource),
        data: mapSections(dataCopy),
      };

    
    case SET_ACTIVE_FIELD:
      const { code, fieldId } = action.payload;

      const dataAfterActive = state.data.map(section => {
        if (section.code === code) {
          const newFields = section.fields.map(field => {
            field.active = field.id === fieldId;
            return field;
          });
          return {
            ...section,
            fields: newFields,
          };
        }
        return section;
      });
      return {
        ...state,
        data: dataAfterActive,
      };

    
    case RESET_ACTIVE_FIELD:
      const dataAfterResetActive = state.data.map(section => {
        const newFields = section.fields.map(field => {
          field.active = false;
          return field;
        });
        return {
          ...section,
          fields: newFields,
        }
      });
      return {
        ...state,
        data: dataAfterResetActive,
      }
    

    case SET_FIELD_VALUE:
      const sectionCode = action.payload.code;
      const targetId = action.payload.fieldId;

      const targetField = findFieldById(targetId, sectionCode, state.data);
      targetField.value = action.payload.value;

      return {
        ...state,
        data: [...state.data],
      };
    

    case RESET_FIELD_VALUE:
      const resetSectionCode = action.payload.code;
      const resetFieldId = action.payload.fieldId;

      const resetField = findFieldById(resetFieldId, resetSectionCode, state.data);
      resetField.value = resetField.initialValue;

      return {
        ...state,
        data: [...state.data],
      };


    case REVERT_ALL_FIELDS:
      state.data.forEach(section => {
        section.fields.forEach(field => {
          field.value = field.initialValue;
        });
      });
      return {
        ...state,
        data: [...state.data],
      };


    case SET_FIELD_OPTIONS:
      const lookupField = findFieldById(action.payload.id, action.payload.code, state.data);
      lookupField.options = action.payload.options;

      return {
        ...state,
        data: [...state.data],
      };

    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default primaryDetails;