import { SET_NEW_VALUE, SET_FIELD_VALUES, UPDATE_VALUES, SET_NEW_ORDER } from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  data: [],
};

const fields = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_VALUES:
      const { allValues } = action;
      const mock = [
        {
          id: 1,
          text: 'A',
        },
        {
          id: 2,
          text: 'B',
        },
        {
          id: 3,
          text: 'C',
        },
        {
          id: 4,
          text: 'D',
        },
        {
          id: 5,
          text: 'E',
        },
        {
          id: 6,
          text: 'F',
        },
        {
          id: 7,
          text: 'G',
        }
      ];
      return {
        data: mock, // should be allValues
      }

    case SET_NEW_VALUE:
      const { json } = action;
      const { data } = state;
      return {
        data: [
          ...state.data,
          json,
        ],
      };

    case UPDATE_VALUES:
      const { id } = action;
      const dataAfterRemoval = state.data.filter(card => card.id != id);
      return {
        data: dataAfterRemoval
      };

    case SET_NEW_ORDER:
      const { array } = action;
      return {
        data: array,
      }
      
    default:
      return state;
  }
};

export default fields;