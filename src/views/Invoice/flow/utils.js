import Enums from 'utils/EnumsManager';

const {
  Quantity,
  UnitPrice,
} = Enums.InvoicePage.ItemsList.Columns;

export const mapToItemInfoForm = (data) => {
  const {
    status,
    invoice_able,
    last_modified_at,
    last_modified_by_user,
    description,
  } = data;
  return {
    idStatus: {
      value: status,
    },
    idRelateTo: {
      value: invoice_able ? invoice_able.name : '',
    },
    // TODO: convert with date time utils
    idLastModifiedDate: {
      value: last_modified_at,
    },
    idModefiedBy: {
      value: last_modified_by_user,
    },
    idDescription: {
      value: description,
    },
  };
};

export const mapToItems = ({ items }) => {
  if (!items || _.isEmpty(items.items)) {
    return [];
  }

  return items.items.map((item, i) => ({
    id: i,
    itemDescription: item.description,
    itemCode: item.code,
    quantity: item.quanlity,
    unitPrice: item.unit_price,
  }));
};

export const getSubTotal = data => data.reduce((sum, curVal) => {
  return sum + (curVal.quantity * curVal.unitPrice);
}, 0);

/**
 * Compute sum based on operator types
 * @param {*} value
 * @param {*} extraValue
 * @param {*} operator: add, add_percentage
 */
const getSumByOp = (value, extraValue, operator) => {
  // TODO: up
  switch (operator) {
    case 'add':
      return value + extraValue;
    case 'add_percentage':
      return value * (1 + (extraValue / 100));
    case 'sub':
      return value - extraValue;
    case 'sub_percentage':
      return value - extraValue;
    default:
      return 0;
  }
};

export const mapToSummary = ({ extra_prices }, subTotal) => {
  if (_.isEmpty(extra_prices)) {
    return [];
  }

  const { Tax, Total } = extra_prices;
  return [
    {
      id: 1,
      description: 'rowTotal',
      additionVal: Total.additions,
      additionOp: Total.price_operator,
      total: getSumByOp(subTotal, Total.additions, Total.price_operator),
    },
    {
      id: 2,
      description: 'tax',
      additionVal: Tax.additions,
      additionOp: Tax.price_operator,
      total: 0,
    },
    {
      id: 3,
      description: 'grandTotal',
      additionVal: '',
      additionOp: '',
      total: 0,
    },
  ];
};
