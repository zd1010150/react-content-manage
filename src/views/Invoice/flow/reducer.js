import { SET_ATTACHMENT, REMOVE_ATTACHMENT } from './actionTypes';

const invoice = (state = {}, action) => {
  switch (action.type) {
    case SET_ATTACHMENT:
      const { newFile } = action.payload;
      return {
        ...state,
        fileList: [newFile],
      };

    case REMOVE_ATTACHMENT:
      const { existFile } = action.payload;
      return {
        ...state,
        fileList: [],
      };

    default:
      return state;
  }
};

export default invoice;
