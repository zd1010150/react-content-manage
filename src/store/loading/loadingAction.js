import { HTTP_ACTION_DOING, HTTP_ACTION_DONE } from './constants';

export const showLoading = () => ({ type: HTTP_ACTION_DOING });
export const hideLoading = () => ({ type: HTTP_ACTION_DONE });
