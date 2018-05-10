import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';

const { FieldTypes } = Enums;
const { DateOnly, DateTime } = FieldTypes;

export default (store) => {
  const { sections } = store.clientDetails.details;
  const requestBody = {};
  sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.value !== field.initialValue) {
        requestBody[field.name] = field.value;
        if (field.type === DateOnly) {
          requestBody[field.name] = toUtc(field.value);
        }
        if (field.type === DateTime) {
          requestBody[field.name] = toUtc(field.value, true);
        }
      }
    });
  });
  console.log('---====PRINT BODY====---');
  console.dir(requestBody);
  return requestBody;
};
