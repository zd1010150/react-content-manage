import {
  SET_FILTERS,
  ADD_FILTER,
  SET_CONDITION_LOGIC,
  RESET_VIEW,
  REMOVE_FILTER,
  CHANGE_FILTER,
} from './actionTypes';
import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';

const formatData = data => {
  if (!_.isArray(data)) return [];

  return data.map(record => {
    const { display_num, id, condition, value, crm_data_type } = record;

    let newValue = value;
    // TODO: replace the format with the value from backend
    // TODO: replace offset with user info timezone, need to consider undefined
    if (crm_data_type === Enums.FieldTypes.Date
        || crm_data_type === Enums.FieldTypes.DateTime) {
      newValue = toTimezone(value, '+1100', crm_data_type === Enums.FieldTypes.Date ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss');
    }

    return {
      displayNum: display_num,
      fieldId: id,
      conditionId: condition,
      value: newValue,
      type: crm_data_type,
    };
  });
};

const initialState = {
  condition_logic: '',
  filters: [],
};

const filterCriteria = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      const { data } = action.payload;      
      return {
        ...state,
        filters: formatData(data),
      };


    case SET_CONDITION_LOGIC:
      const { condition_logic } = action.payload;
      return {
        ...state,
        condition_logic,
      };
    

    case ADD_FILTER:
      const { filters } = state;
      const lastItem = filters[filters.length - 1];
      const newDisplayNum = lastItem && lastItem.displayNum ? (lastItem.displayNum + 1) : 1;
      
      // TODO: when add a new filter, the default should be null, but before submit to backend, this id should be any available field id, NOT a phantom id
      const newFilter = {      
        displayNum: newDisplayNum,
        fieldId: Enums.PhantomID,
        conditionId: Enums.PhantomID,
        value: '',
        type: '',
      };

      return {
        ...state,
        filters: [...filters, newFilter]
      };

      
    case REMOVE_FILTER:
      const removedItemNum = action.payload.displayNum;
      const arrayAfterRemove = state.filters.filter(filter => filter.displayNum != removedItemNum);
      return {
        ...state,
        filters: arrayAfterRemove,
      };
    

    case CHANGE_FILTER:
      const { key, value, fieldId, displayNum } = action.payload;
      const filtersAfterChange = state.filters.map(filter => {
        if (filter.displayNum === displayNum) {
          filter[key] = value;
          if (fieldId) {
            filter.fieldId = fieldId;
          }
        }
        return filter;
      });

      return {
        ...state,
        filters: filtersAfterChange,
      };


    case RESET_VIEW:
      return initialState;


    default:
      return state;
  }
};

export default filterCriteria;