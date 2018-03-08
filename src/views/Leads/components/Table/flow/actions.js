import { FETCH_SUCCESS, DELETE_SUCCESS } from './actionTypes';
import Enums from 'utils/EnumsManager';

export const deleteLead = id => ({
  type: DELETE_SUCCESS,
  payload: { id },
});

export const fetchByParams = (
  page = 1,
  per_page = Enums.DefaultPageConfigs.PageSize,
  orderBy,
  sortedBy,
) => {

  console.log(`fetching -> page:${page}, per_page:${per_page}, orderBy:${orderBy}, sortedBy:${sortedBy}`);
  return ({
    type: 'newworld'
  });
};