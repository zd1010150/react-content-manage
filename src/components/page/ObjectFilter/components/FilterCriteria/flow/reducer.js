import { ADD_FILTER, SET_CONDITION_LOGIC, RESET_VIEW, REMOVE_FILTER } from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  condition_logic: '',
  filters: [],
};

const filterCriteria = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONDITION_LOGIC:
      const { condition_logic } = action.payload;
      return {
        ...state,
        condition_logic,
      };
    
    case ADD_FILTER:
      const { filters } = state;
      const lastItem = filters[filters.length - 1];
      const display_num = lastItem && lastItem.display_num ? (lastItem.display_num + 1) : 1;
      const newFilter = {
        // TODO: when add a new filter, the default should be null, but before submit to backend, this id should be any available field id, NOT a phantom id
        id: Enums.PhantomID,
        display_num,
        condition: '',
        value: '',
      };
      return {
        ...state,
        filters: [...filters, newFilter]
      };

    case REMOVE_FILTER:
      const { displayNum } = action.payload;
      const arrayAfterRemove = state.filters.filter(filter => filter.display_num != displayNum);
      return {
        ...state,
        filters: arrayAfterRemove
      };

    case RESET_VIEW:
      return initialState;

    default:
      return state;
  }
};

export default filterCriteria;