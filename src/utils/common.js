import Enums from './EnumsManager';

export const mapToAPIOrderStr = (order = 'ascend') => {
  return Enums.SortOrders[order];
};

export const getUrlByViewId = (id, object) => {
  return id === Enums.PhantomID ? `/admin/${object}` : `/admin/${object}/by_list_view/${id}`;
};