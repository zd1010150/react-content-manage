import { RESET_VIEW, SAVE_VIEW } from './actionTypes';
import { post, patch } from 'store/http/httpAction';

export const resetView = () => ({
  type: RESET_VIEW,
});

export const saveView = () => ({
  type: SAVE_VIEW,
});

// export const saveView = (
//   id,
//   view_name,
//   filters,
//   condition_logic,

// ) => dispatch => post('/leads', { page, per_page, orderBy, sortedBy }, dispatch).then(json => {
//   if (json && (!_.isEmpty(json.index))) {

//   }
// });