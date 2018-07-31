import { get } from 'store/http/httpAction';
import {
  ADD_NEW_ITEM,
} from './actionTypes';

export const addNewItem = () => ({
  type: ADD_NEW_ITEM,
});
