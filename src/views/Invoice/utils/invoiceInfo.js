import moment from 'moment';

export const formatData = data => ({
  invoiceNum: {
    value: data.invoice_no,
  },
  invoiceDate: {
    value: moment(),
  },
  invoiceDueDate: {
    value: moment(),
  },
});

export const isInvoiceInfoValid = (data) => {
  const keys = Object.keys(data);
  return !keys.some((key) => {
    const field = data[key];
    if (_.isArray(field.errors)) return field.errors.length;
    return false;
  });
};
