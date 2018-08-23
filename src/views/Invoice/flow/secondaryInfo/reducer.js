import Enums from 'utils/EnumsManager';
import { formatRelatedTos, formatInfo } from '../../utils/secondaryInfo';
import { RESET } from '../actionTypes';
import { SET_INFO, SET_RELATED_TO, SET_RELATED_TOS, SET_STATUS, SET_DESCRIPTION } from './actionTypes';

const {
  Leads,
  Accounts,
  Opportunities,
} = Enums.ObjectTypes;

const initialState = {
  relatedLeads: [],
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
    case SET_INFO:
      return {
        ...state,
        ...formatInfo(action.payload.data),
      };

    case SET_RELATED_TOS:
      return {
        ...state,
        relatedLeads: formatRelatedTos(action.payload.data, Leads),
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
