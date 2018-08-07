import Enums from 'utils/EnumsManager';
import { formatRelatedTos } from '../../utils/secondaryInfo';
import { RESET } from '../actionTypes';
import { SET_RELATED_TO, SET_RELATED_TOS, SET_STATUS, SET_DESCRIPTION } from './actionTypes';

const {
  Accounts,
  Opportunities,
} = Enums.ObjectTypes;

const initialState = {
  relatedAccounts: [],
  relatedOpportunities: [],
  relatedTo: '',
  status: '',
  description: '',
  lastModifiedAt: '',
  lastModifiedBy: '',
};

const secondaryInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_RELATED_TOS:
      return {
        ...state,
        relatedAccounts: formatRelatedTos(action.payload.data, Accounts),
        relatedOpportunities: formatRelatedTos(action.payload.data, Opportunities),
      };

    case SET_RELATED_TO:
      return {
        ...state,
        relatedTo: action.payload.id,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.payload.id,
      };

    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default secondaryInfo;
