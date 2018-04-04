import { SET_DATA_SOURCE, SET_ACTIVE_FIELD, RESET, RESET_ACTIVE_FIELD } from './actionTypes';

const initialState = {
  dataSource: [],
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
    } = meta;

    return {
      id, // used by lookup field for fetchinig data
      key: id,
      label: field_label,
      name: field_name,
      options: picklists,
      readOnly: page_readonly,
      required: page_required,
      helpText: help_text,
      type: crm_data_type,
      active: false,
      value,
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


const primaryDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_SOURCE:
      const { dataSource } = action.payload;
      const newDataSource = mapSections(dataSource);  
      return {
        ...state,
        dataSource: newDataSource,
      };

    
    case SET_ACTIVE_FIELD:
      const { code, fieldId } = action.payload;

      const dataAfterActive = state.dataSource.map(section => {
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
        dataSource: dataAfterActive,
      };

    
    case RESET_ACTIVE_FIELD:
      const dataAfterResetActive = state.dataSource.map(section => {
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
        dataSource: dataAfterResetActive,
      }
    
    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default primaryDetails;