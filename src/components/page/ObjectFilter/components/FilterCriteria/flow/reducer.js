import {
  SET_FILTERS,
  ADD_FILTER,
  SET_CONDITION_LOGIC,
  RESET_VIEW,
  REMOVE_FILTER,
  CHANGE_FILTER,
  SET_SIDER_OPTIONS,
  SET_SIDER_SELECTION,
  SYNC_SIDER_SELECTION,
  INSERT_SIDER_SELECTION,
} from './actionTypes';
import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';

const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
  Display,
} = Enums.FieldTypes;


const formatData = data => {
  if (!_.isArray(data)) return [];

  return data.map(record => {
    const { display_num, id, condition, value, crm_data_type, picklists } = record;

    let newValue = value;
    // TODO: replace the format with the value from backend
    // TODO: replace offset with user info timezone, need to consider undefined
    if (crm_data_type === DateOnly
        || crm_data_type === DateTime) {
      newValue = toTimezone(value, crm_data_type === DateTime);
    }

    // Attach options to Picklist and Lookup field for RightSider
    let extraProperties = {};
    if (crm_data_type === PickList) {
      extraProperties.options = picklists;
    }
    if (crm_data_type === Lookup) {
      extraProperties.options = [];
    }

    return {
      displayNum: display_num,
      fieldId: id,
      conditionId: condition,
      value: newValue,
      type: crm_data_type,
      ...extraProperties,
    };
  });
};

const initialSider = {
  siderDisplayNum: Enums.PhantomId,
  siderFieldId: Enums.PhantomId,
  siderOptions: [],
  siderSelection: [],
};
const initialState = {
  condition_logic: '',
  filters: [],
  ...initialSider,
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
        fieldId: Enums.PhantomId,
        conditionId: Enums.PhantomId,
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
          if (key === 'type') {
            filter.fieldId = fieldId;
            filter.value = '';
          }
          filter[key] = value;
        }
        return filter;
      });
      // If changing from field to another field, then reset value and sider
      if (key === 'type') {
        return {
          ...state,
          filters: filtersAfterChange,
          ...initialSider,
        };
      }
      return {
        ...state,
        filters: filtersAfterChange,
      };

    
    case SET_SIDER_OPTIONS:
      const { siderDisplayNum, siderOptions } = action.payload;
      return {
        ...state,
        siderDisplayNum,
        siderOptions,
      };

    
    case SET_SIDER_SELECTION:
      // Get selected values based on value
      const activeFilter = state.filters.find(filter => filter.displayNum === state.siderDisplayNum);
      const values = activeFilter.value.split(',').map(value => value.trim());      
      const optionKey = activeFilter.type === Lookup
                          ? 'name'
                          : 'option_value';
      const siderSelection = state.siderOptions.filter(option => values.indexOf(option[optionKey]) !== -1);
      return {
        ...state,
        siderSelection,
      };

    
    case SYNC_SIDER_SELECTION:
      const { checkedIds } = action.payload;
      const syncedSiderSelection = state.siderOptions.filter(option => checkedIds.indexOf(option.id) !== -1);
      return {
        ...state,
        siderSelection: syncedSiderSelection,
      };

    
    case INSERT_SIDER_SELECTION:
      const currentFilter = state.filters.find(filter => filter.displayNum === state.siderDisplayNum);
      const currentValues = currentFilter.value.split(',').map(value => value.trim());
      const targetKey = currentFilter.type === Lookup
                          ? 'name'
                          : 'option_value';
      const unaddedSelection = state.siderSelection.filter(option => currentValues.indexOf(option[targetKey]) === -1);
      const newValue = unaddedSelection.reduce((accumulator, currentValue) => accumulator + currentValue[targetKey] + ', ', '');
      const newFilters = state.filters.map(filter => {
        if (filter.displayNum === state.siderDisplayNum) {
          filter.value += newValue;
        }
        return filter;
      });
      return {
        ...state,
        filters: newFilters,
      };


    case RESET_VIEW:
      return initialState;


    default:
      return state;
  }
};

export default filterCriteria;