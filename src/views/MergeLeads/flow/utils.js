import { toUtc } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';

const { FieldTypes, MasterKey } = Enums;
const { DateOnly, DateTime } = FieldTypes;

const toApi = (data, keys) => {
  const dataCopy = _.cloneDeep(data);
  // First, need to remove master record id, due to request format, see more on our POSTMAN doc
  delete dataCopy[MasterKey];
  // TODO: because all data field is just for display, we can keep the original value from backend, and only convert for display
  // Second, convert all data to utc format
  keys.forEach((key) => {
    if (key.type === DateOnly || key.type === DateTime) {
      if (dataCopy[key.key] !== undefined) {
        const value = dataCopy[key.key];
        dataCopy[key.key] = toUtc(value, key.type === DateTime);
      }
    }
  });

  return dataCopy;
};

export default toApi;
