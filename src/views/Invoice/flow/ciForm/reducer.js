import { SET_CI_FORM, SET_CI_FIELD } from './actionTypes';
import { formatData } from '../../utils/ciForm';
import { RESET } from '../actionTypes';

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
    case SET_CI_FORM:
      return formatData(action.payload.data);

    case SET_CI_FIELD:
      const { field } = action.payload;
      return {
        ...state,
        ...field,
      };
    
    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default ciForm;
