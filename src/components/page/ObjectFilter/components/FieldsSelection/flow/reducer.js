import { ADD_TO_SELECTION, REMOVE_FROM_SELECTION, RESET_VIEW, SET_AVAILABLE_FIELDS, SET_NEW_ORDER } from './actionTypes';

const initialState = {
  availableFields: [],
  selectedFields: [],
  allFields: [],
};

const fields = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_FIELDS:
      const { data } = action.payload;
      const dataCopy = _.cloneDeep(data);
      return {
        ...state,
        allFields: data, // this was used by criteria section, without affecting original order.
        availableFields: dataCopy,
      };


    case ADD_TO_SELECTION:
      const { addedFields } = action.payload;
      const addedFieldIds = addedFields.map(field => field.id);
      const restAvailables = state.availableFields.filter(field => addedFieldIds.indexOf(field.id) === -1);
      // console.dir(addedFields);
      return {
        ...state,
        availableFields: restAvailables,
        selectedFields: [...state.selectedFields, ...addedFields],
      };


    case REMOVE_FROM_SELECTION:
      const { removedFields } = action.payload;
      const removedFieldIds = removedFields.map(field => field.id);
      const restSelection = state.selectedFields.filter(field => removedFieldIds.indexOf(field.id) === -1);
      // console.dir(removedFields);
      return {
        ...state,
        availableFields: [...state.availableFields, ...removedFields],
        selectedFields: restSelection,
      };


    case SET_NEW_ORDER:
      const { sortedArray } = action.payload;
      return {
        ...state,
        selectedFields: sortedArray,
      };


    case RESET_VIEW:
      return initialState;


    default:
      return state;
  }
};

export default fields;
