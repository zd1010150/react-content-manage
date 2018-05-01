/* eslint arrow-parens: ["error", "as-needed"] */
import { get } from 'store/http/httpAction';
import getFetchUrl from './utils/getFetchUrl';
import getUpdateUrl from './utils/getUpdateUrl';
import { SET_SECTIONS } from './actionTypes';

const mapToApi = store => {
  console.dir(store.objectDetails);
};


/**
 *  Fetch A Client Structure Data
 */
const setSections = (mappedValues = [], sections) => ({
  type: SET_SECTIONS,
  payload: { mappedValues, sections },
});

export const tryFetchObjectDetails = (objectId, objectType, accountId) => dispatch =>
  get(getFetchUrl(objectId, objectType, accountId), {}, dispatch).then(data => {
    if (data
        && !_.isEmpty(data.data)
        && !_.isEmpty(data.data.structure)) {
      const { tools, sections, modules } = data.data.structure;
      if (tools && sections && modules) {
        dispatch(setSections(data.mapped_values, sections));
        // TODO: Add actions
        // dispatch(setTools(tools));
        // dispatch(setModules(modules));
      }
    }
  });

/**
 *  TODO: OPERATIONS LIST
 *  save, save and new, revert all, go back
 *  revert single, change field, load options for lookup field when first open
 *  ?
 */

/**
 *  SAVE OR UPDATE A CLIENT
 */
export const tryUpdateClient = (objectId, objectType) => (dispatch, getState) =>
  get(getUpdateUrl(objectId, objectType), mapToApi(getState()), dispatch).then(data => {
    if (data) {
      debugger;
    }
  });

export const setField = () => {};
