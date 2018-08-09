import moment from 'moment';
import { getTimeSetting, toTimezone, toUtc } from 'utils/dateTimeUtils';

/**
 * @description Convert response for front end needs.
 * @returns A moment object should be returned in order to work with Ant design form
 * @param {string} dateStr
 */
const formatDate = (dateStr) => {
  if (_.isEmpty(dateStr) || !moment(dateStr).isValid) {
    return moment();
  }
  return moment(dateStr);
};

export const formatData = data => ({
  invoiceNum: {
    value: data.invoice_no,
  },
  invoiceDate: {
    value: formatDate(data.invoice_date),
  },
  invoiceDueDate: {
    value: formatDate(data.due_date),
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
