import Enums from './EnumsManager';

export const mapToAPIOrderStr = (order = 'ascend') => {
  return Enums.SortOrders[order];
};