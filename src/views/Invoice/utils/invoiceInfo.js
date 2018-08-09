import moment from 'moment';
import { getTimeSetting, toUtc } from 'utils/dateTimeUtils';

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

const momentToStr = (obj) => {
  const timeSetting = getTimeSetting();
  if (obj && obj.isValid() && obj.isValid()) {
    return obj.format(timeSetting.format);
  }
  return '';
};

export const toApi = data => ({
  invoice_no: data.invoiceNum.value,
  invoice_date: toUtc(momentToStr(data.invoiceDate.value)),
  due_date: toUtc(momentToStr(data.invoiceDueDate.value)),
});
