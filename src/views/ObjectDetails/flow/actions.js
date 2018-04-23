import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { setTools } from '../components/Toolbar/flow/actions';
import { setSource } from '../components/PrimaryDetails/flow/actions';
// import {} from '../components/TaskPanel/flow/actions';
import { RESET } from './actionTypes';

const { PhantomId } = Enums;

const getFetchDetailUrl = (objectType, objectId) => {
  const baseUrl = `/admin/${objectType}`;
  const url = objectId === PhantomId ? 'create' : `${objectId}/page_layout`;
  return `${baseUrl}/${url}`;
};

export const tryFetchClientDetails = (objectType, objectId) => dispatch =>
  get(getFetchDetailUrl(objectType, objectId), {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)
        && !_.isEmpty(data.data.structure)
        && (data.data.structure.tools
            || data.data.structure.sections
            || data.data.structure.modules)) {
      dispatch(setTools(data.data.structure.tools));
      // dispatch(setSource(data.data.structure.sections));
      // dispatch(setTools(data.data.structure.tools));
    }
  });

//
export const reset = () => ({
  type: RESET,
});
