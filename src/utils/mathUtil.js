import _ from 'lodash';

export const getUnitPrice = (orginAmount, originQuantity) => {

  try {
    const amount = Number(orginAmount);
    let quantity = Number(originQuantity);
    if (Number.isNaN(amount) || Number.isNaN(quantity)) {
      return 0;
    }
    quantity = quantity === 0 ? 1 : quantity;
    return _.round(amount / quantity, 2);
  } catch (e) {
    return 0;
  }
};

