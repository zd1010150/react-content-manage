/* eslint-disable max-len */
import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';
import {
  ADD_FILTER,
  CHANGE_FILTER,
  INSERT_SIDER_SELECTION,
  REMOVE_FILTER,
  RESET_VIEW,
  SET_CONDITION_LOGIC,
  SET_FILTERS,
  SET_SIDER_OPTIONS,
  SET_SIDER_SELECTION,
  SYNC_SIDER_SELECTION,
  SET_ALL_FIELDS,
  SET_TIME_RANGE_VALUE,
} from './actionTypes';
import {
  getConditionLogic,
  getDefaultValueByFieldType,
  getFieldMeta,
  formatFields,
} from './utils';

const { FieldTypes, DateTimeConfigs } = Enums;
const {
  DateOnly,
  DateTime,
  Lookup,
  PickList,
} = FieldTypes;
const { SubTypes } = DateTimeConfigs;
const { Range } = SubTypes;

const formatData = (data) => {
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
      if (value !== '' && value.slice(-1) !== ',') {
        newValue = value.concat(', ');
      }
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
  fields: [],
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

    case SET_ALL_FIELDS:
      const { fields } = action.payload;
      return {
        ...state,
        fields: formatFields(fields),
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

      const newFilter = {
        displayNum: newDisplayNum,
        fieldId: Enums.PhantomId,
        conditionId: Enums.PhantomId,
        value: '',
        type: '',
      };
      const filtersAfterAdd = [...filters, newFilter];
      return {
        ...state,
        filters: filtersAfterAdd,
        condition_logic: getConditionLogic(state, filtersAfterAdd, true),
      };


    case REMOVE_FILTER:
      const removedItemNum = action.payload.displayNum;
      const filtersAfterRemove = state.filters.filter(filter => filter.displayNum != removedItemNum);
      return {
        ...state,
        filters: filtersAfterRemove,
        condition_logic: getConditionLogic(state, filtersAfterRemove),
      };


    case CHANGE_FILTER:
      const {
        key,
        value,
        fieldId,
        displayNum,
      } = action.payload;
      // TODO: Refactor needed to cater for new requirements
      const filtersAfterChange = state.filters.map((filter) => {
        if (filter.displayNum === displayNum) {          
          const meta = getFieldMeta(fieldId, state.fields);
          if (key === 'type') {            
            if (meta) {
              filter.fieldId = fieldId;
              filter.type = meta.type;
              filter.value = getDefaultValueByFieldType(meta.type);
            }
          }
          filter[key] = value;
          // case to lock condition to be equals when time range subtype is range
          if (key === 'conditionId') {
            if (_.isPlainObject(filter.value) && filter.value.subtype === Range) {
              filter[key] = 'equals';
            }
          }
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

    case SET_TIME_RANGE_VALUE:
      const timeRangeFilter = state.filters.find(f => f.displayNum === action.payload.displayNum);
      timeRangeFilter.value[action.payload.prop] = action.payload.newValue;
      return {
        ...state,
        filters: [...state.filters],
      };


    case RESET_VIEW:
      return initialState;

    default:
      return state;
  }
};

export default filterCriteria;
