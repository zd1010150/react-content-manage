import { SET_CI_FIELD } from './actionTypes';

const initialState = {
  ciName: {
    value: '',
  },
  ciAddress: {
    value: '',
  },
  ciCountry: {
    value: '',
  },
  ciPhone: {
    value: '',
  },
};

const ciForm = (state = initialState, action) => {
  switch (action.type) {
    case SET_CI_FIELD:
      const { field } = action.payload;
      return {
        ...state,
        ...field,
      };

    default:
      return state;
  }
};

export default ciForm;
