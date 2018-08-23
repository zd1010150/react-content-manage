import { SET_ATTACHMENT_INFO, SET_FIELD_VALUE, RESET } from './actionTypes';

const initState = {
  url: '',
  file: null,
  category: null,
  comment: '',
};

const attachment = (state = initState, action) => {
  switch (action.type) {
    case SET_ATTACHMENT_INFO:
      const { data } = action.payload;
      return {
        id: data.id,
        url: data.url,
        comment: data.comment,
        category: data.category,
      };

    case SET_FIELD_VALUE:
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };

    case RESET:
      return initState;

    default:
      return state;
  }
};

export default attachment;
