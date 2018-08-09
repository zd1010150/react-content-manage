import { RESET } from '../actionTypes';
import {
  ADD_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_ATTACHMENTS,
} from './actionTypes';
import Attachment from '../../utils/attachments';

const initialState = [];

const attachments = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATTACHMENTS:
      return action.payload.data.map((item) => {
        const info = {
          uid: item.file_id,
          name: item.description,
          // TODO: url is needed when load exist invoice's attachments
          url: item.url,
        };
        return new Attachment(info);
      });

    case ADD_ATTACHMENT:
      return [...state, new Attachment(action.payload.data)];

    case REMOVE_ATTACHMENT:
      return state.filter(attach => attach.uid !== action.payload.id);

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default attachments;
