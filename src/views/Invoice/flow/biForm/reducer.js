import { SET_BI_FIELD, SET_BI_FORM } from './actionTypes';
import { formatData } from '../../utils/biForm';

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
    case SET_BI_FORM:
      return formatData(action.payload.data);

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
