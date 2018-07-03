import { SET_BI_FIELD } from './actionTypes';

const initialState = {
  biName: {
    value: '',
  },
  biAddress: {
    value: '',
  },
  biCountry: {
    value: '',
  },
  biPhone: {
    value: '',
  },
};

const biForm = (state = initialState, action) => {
  switch (action.type) {
    case SET_BI_FIELD:
      const { field } = action.payload;
      return {
        ...state,
        ...field,
      };

    default:
      return state;
  }
};

export default biForm;
