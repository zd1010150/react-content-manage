import { RESET } from '../actionTypes';
import {
  ADD_ATTACHMENT,
  REMOVE_ATTACHMENT,
} from './actionTypes';
import Attachment from '../../utils/attachments';

const initialState = [];

const attachments = (state = initialState, action) => {
  switch (action.type) {
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
