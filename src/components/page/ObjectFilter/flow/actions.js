import { RESET_VIEW, SAVE_VIEW } from './actionTypes';
import { setAvailableFields } from '../components/FieldsSelection/flow/actions';
import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';

export const resetView = () => ({
  type: RESET_VIEW,
});

const getFetchUrlById = (id, objectType) => {
  const baseUrl = '/admin/list_views';
  if (id === Enums.PhantomID) {
    return `${baseUrl}/object/${objectType}/create`;
  } else {
    return `${baseUrl}/${id}`;
  }
};

export const fetchViewById = (
  id,
  objectType,
) => dispatch => get(getFetchUrlById(id, objectType), {}, dispatch).then(json => {
  if (json
      && !_.isEmpty(json.all_field)
      && !_.isEmpty(json.all_field.data)) {
    dispatch(setAvailableFields(json.all_field.data));
  }
});